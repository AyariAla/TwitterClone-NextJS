import {
  PhotographIcon,
  XIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  CalendarIcon,
} from '@heroicons/react/outline'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import React from 'react'
import { useState, useRef } from 'react'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { useSession, signOut } from 'next-auth/react'

function Input() {
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const { data: session } = useSession()

  // adding the emoji to the text area
  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach((el) => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }
  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id} / image`)
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL, //updating the image in the storage
        })
      })
    }
    setLoading(false)
    setInput('')
    setSelectedFile(null)
    setShowEmojis(false)
  }

  //showing the image in the input component
  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }
  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 scrollbar-hide ${
        loading && 'opacity-60'
      }`}
    >
      {/* "https://yt3.ggpht.com/yti/APfAmoFAVKiK_LWl7hGPCTWQCue4xNOrSkjXs1kLF1t2EQ=s88-c-k-c0x00ffffff-no-rj-mo" */}
      <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full "
        onClick={signOut}
      />
      <div className="w-full divide-y divide-gray-700">
        {/* adding space under when image is selected */}
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            className=" min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
            placeholder="What's happening ?"
            value={input}
            rows={2}
            onChange={(e) => setInput(e.target.value)}
          />
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute top-1 left-1 flex h-8 w-8 
          cursor-pointer items-center justify-center rounded-full
           bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="h-5 text-white" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="max-h-80 rounded-2xl object-contain"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center ">
              {/* Making a reference to the filepicker to get the click to be triggered when clicking on the icon and not 
             on the filepicker which is hidden */}
              <div
                className="icon px-2"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  className=""
                  onChange={addImageToPost}
                  ref={filePickerRef}
                  hidden
                />
              </div>
              <div className="icon px-2">
                <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div
                className="icon px-2"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon px-2">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>
              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="rounded-full bg-[#1d9bf0] px-4 py-1.5 
           font-bold text-white shadow-md hover:bg-[#1a8cd8]
           disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0] "
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
