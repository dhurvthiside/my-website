import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
import Modal from "../Components/Modals/Modal";
import { useAuth } from "../Context/AuthContext";
// // import { AuthContextType } from "@/types";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Tiptap from "../RTE/RTE";

export default function AddProduct() {
  const { user } = useAuth();
  //   const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (image) {
      setIsOpen(false);
    }
  }, [image]);

  //   async function createBlog() {
  //     try {
  //       const res = await axios.post("/api/blog/create-blog", {
  //         uid: user?.uid,
  //         text,
  //         image,
  //       });
  //       alert(res.data);
  //       router.push("/");
  //     } catch (e) {
  //       alert("Error creating blog");
  //     }
  //   }
  async function createBlog({ uid, text, image }) {
    try {
      const docRef = collection(db, "products");
      await addDoc(docRef, {
        uid,
        text,
        image,
      });
      return "Blog Created Successfully";
    } catch (error) {
      console.error("Error creating blog:", error);
      throw new Error("Failed to create blog");
    } finally {
      setText("");
    }
  }

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen gap-28">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-7xl font-bold">Create Blog</h1>
        <p className="text-2xl text-gray-500">write down your thoughts</p>
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Upload an image
        </button>
      </div>

      <div>
        <img
          className="object-cover max-h-[375px] w-[1280px]"
          src="/food.png"
          alt="FOOD"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-5xl font-semibold">Text Preview</div>
          <p className="text-2xl text-gray-500">
            Subheading to introduce testimonials
          </p>
        </div>
        <textarea
          className="w-full p-4 border border-gray-300 rounded resize-none"
          placeholder="Placeholder"
          value={text}
          rows={15}
          cols={150}
          disabled
        />
      </div>

      <button
        onClick={() => {
          createBlog({ uid: user?.uid, text, image });
        }}
        className="px-6 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
      >
        Create
      </button>

      {/* <Tiptap
        setText={setText}
        onClick={() => {
          createBlog({ uid: user?.uid, text, image });
        }}
      /> */}

      <Modal open={isOpen} onClose={() => setIsOpen(false)} setURL={setImage} />
    </section>
  );
}
