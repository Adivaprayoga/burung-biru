import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { InfiniteTweetList } from "~/components/InfiniteTweetList";
import { NewTweetForm } from "~/components/NewTweetForm";
import { api } from "~/utils/api";

const TABS = ["For you", "Following"] as const;

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("For you");
  const session = useSession();

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white/90 pt-4">
        <h1 className="px-4 pb-4 text-lg font-bold">
          {session.status === "unauthenticated" ? "Explore" : "Home"}
        </h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab}
                  className="relative flex-grow px-2 py-4 hover:bg-gray-200 focus-visible:bg-gray-200"
                  onClick={() => setSelectedTab(tab)}
                >
                  <span className={`${tab === selectedTab && "font-bold"}`}>
                    {tab}
                  </span>
                  <div
                    className={`${
                      tab === selectedTab
                        ? "absolute bottom-0 left-0 right-0 m-auto w-2/12 rounded-full border-b-4 border-b-sky-500"
                        : ""
                    }`}
                  ></div>
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewTweetForm />
      {selectedTab === "For you" ? <RecentTweets /> : <FollowingTweets />}
    </>
  );
};

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

function FollowingTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

export default Home;
