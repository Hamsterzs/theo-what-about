import React, { useState } from "react";
import type { z } from "zod";
import createVodSchema from "../Schemas/vods";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const AddVod = () => {
  const [vod, setVod] = useState<z.infer<typeof createVodSchema>>({
    title: "",
    thumbnail: "",
    url: "",
    password: "",
  });

  const createVod = trpc.vod.create.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = createVodSchema.safeParse(vod);

    if (!result.success) return alert("something wrong");

    createVod.mutate(result.data);
  };

  return (
    <div>
      {createVod.isLoading && "Loading"}
      {createVod.error && JSON.stringify(createVod.error)}
      {createVod.data && (
        <p>
          This is the creaded data{" "}
          <Link href={"/add-quotes/" + createVod.data.id}>
            {createVod.data.id}{" "}
          </Link>
        </p>
      )}
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex h-screen w-1/2 flex-col justify-center gap-4"
        >
          <label htmlFor="">Title</label>
          <input
            value={vod.title}
            onChange={(e) => setVod({ ...vod, title: e.target.value })}
            className="h-10 border-2 border-primary"
          />
          <label htmlFor="">URL</label>
          <input
            value={vod.url}
            onChange={(e) => setVod({ ...vod, url: e.target.value })}
            className="h-10 border-2 border-primary"
          />
          <label htmlFor="">Thumbnail</label>
          <input
            value={vod.thumbnail}
            onChange={(e) => setVod({ ...vod, thumbnail: e.target.value })}
            className="h-10 border-2 border-primary"
          />
          <label>Password</label>
          <input
            value={vod.password}
            onChange={(e) => setVod({ ...vod, password: e.target.value })}
            className="h-10 border-2 border-primary"
          />
          <button className="mt-5 h-10 cursor-pointer border-2 border-primary hover:bg-primary hover:text-white">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVod;
