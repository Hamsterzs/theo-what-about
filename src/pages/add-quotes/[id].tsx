import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const AddQuotes = () => {
  const createQuotes = trpc.quote.create.useMutation();
  const [quotes, setQuotes] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  const handleCreateQuote = () => {
    if (!quotes) return alert("Not empty");

    const split = quotes.split("\n");
    const createdQuotes = [];

    for (let index = 0; index < split.length; index += 2) {
      createdQuotes.push({
        timeStamp: split[index] as string,
        quote: split[index + 1] as string,
        vodId: id as string,
      });

      console.log("final", createdQuotes);
    }

    createQuotes.mutate({ quotes: createdQuotes, password });
  };

  return (
    <>
      {createQuotes.isLoading && "Loading"}
      {createQuotes.error && JSON.stringify(createQuotes.error)}
      {createQuotes.isSuccess && "SUCCESS"}
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={handleCreateQuote}
          className="my-2 border-2 px-2 py-1 hover:border-primary"
        >
          Create quotes
        </button>
        <label>Password</label>
        <input
          className="border-2 border-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <textarea
          onChange={(e) => setQuotes(e.target.value)}
          value={quotes}
          className="my-2 h-[90vh] w-[50%] border-2 border-primary p-4"
        />
      </div>
    </>
  );
};

export default AddQuotes;
