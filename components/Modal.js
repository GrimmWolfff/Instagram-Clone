import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { CameraIcon } from "@heroicons/react/outline";
import  { db, storage } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from '@firebase/storage';

function Modal() {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const addImgToPost = e => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = readerEvent => setSelectedFile(readerEvent.target.result)
    }

    const uploadPost = async () => {
        if(loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), { 
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })
        console.log(`New doc added with id ${docRef.id}`);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            });
        })
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
                        transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div onClick={() => filePickerRef.current.click()} className="flex flex-col items-center justify-center mt-3 text-center sm:mt-5">
                                {selectedFile ? (
                                    <img src={selectedFile} className="w-full object-contain cursor-pointer" alt="" onClick={() => setSelectedFile(null)}/>
                                ) : (
                                    <>
                                        <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        <Dialog.Title as="h3" className="text-lg loading-6 font-medium text-gray-900">
                                            Upload a Photo
                                        </Dialog.Title>
                                    </>                                    
                                )}
                            </div>
                            <div>
                                <input type="file" hidden ref={filePickerRef} onChange={addImgToPost}/>
                            </div>
                            <div className="mt-2">
                                <input ref={captionRef} type="text" className="border-none focus:ring-0 w-full text-center" placeholder="Please Enter Caption..."/>
                            </div>
                            <button type="buttton" disabled={!selectedFile} onClick={uploadPost} 
                            className="inline-flex justify-center w-full rounded-lg shadow-sm px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                                {!loading ? <>Finish</> : <>Uploading...</>}
                            </button>
                        </div>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
