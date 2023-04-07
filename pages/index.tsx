import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

const cls = (str1: string, str2: string) => str1 + str2;

interface IResponse {
  url: string;
  isLiked: boolean;
}

export default function Home() {
  const { data, mutate } = useSWR<IResponse>(
    "https://dogs-api.nomadcoders.workers.dev",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const onNewDogClick = () => {
    if (data) {
      mutate({ ...data }, true);
    }
  };
  const onLikeClick = () => {
    if (data) {
      mutate({ ...data, isLiked: !data.isLiked }, false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <div className="bg-gray-800 p-2 space-y-2 rounded-lg">
        <video
          src={data?.url}
          controls
          className="rounded-md aspect-square h-80 object-cover"
        ></video>
        <div className="grid grid-cols-5 w-full text-gray-100 text-lg">
          <button
            onClick={onNewDogClick}
            className="col-span-4 bg-gray-100 text-gray-800 px-1 py-2 font-semibold rounded-md  hover:ring-2 ring-offset-2 ring-offset-gray-800 ring-green-500 transition-all"
          >
            <span>New Dog!</span>
          </button>
          <button
            onClick={onLikeClick}
            className={cls(
              "flex justify-center w-full  p-1 stroke-red-400 transition-all ",
              data?.isLiked
                ? "text-red-600 stroke-red-600 scale-110"
                : "text-gray-50 hover:text-red-400"
            )}
          >
            <svg
              className="pl-2 h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
