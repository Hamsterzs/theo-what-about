import React from "react";
import { useVodSearch } from "../store/vodSearch";
import { trpc } from "../utils/trpc";

const Vods = () => {
  const { search } = useVodSearch();
  const vods = trpc.vod.getAll.useQuery(search);

  if (!search)
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Enter a search term
      </div>
    );

  return (
    <>
      {vods.data && (
        <div className="container mx-auto px-6">
          {vods.data.map((vod) => {
            return (
              <div
                key={vod.id}
                className="my-8 mx-auto flex flex-col items-center justify-center gap-16 rounded-md border-2 border-primary py-20 text-center text-lg shadow-md lg:w-1/2"
              >
                <img
                  src={vod.thumbnail}
                  alt="Vod Thumbnail"
                  className="w-[300px]"
                />
                <div className="flex w-2/3 flex-col gap-8">
                  <h1 className="font-bold">{vod.title}</h1>
                  <ul className="h-96 overflow-auto">
                    {[
                      ...vod.quotes,
                      ...vod.quotes,
                      ...vod.quotes,
                      ...vod.quotes,
                      ...vod.quotes,
                    ].map((q) => {
                      const [seconds, minutes, hours] = q.timeStamp
                        .split(":")
                        .reverse();

                      const timeStampQuery = `&t=${
                        hours ? `${hours}h` : ""
                      }${minutes}m${seconds}s`;

                      return (
                        <li key={q.id}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-auto block w-full cursor-pointer border py-2 hover:bg-gray-200"
                            href={vod.url + timeStampQuery}
                          >
                            <q>{q.quote}</q>
                            <div>{q.timeStamp}</div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Vods;
