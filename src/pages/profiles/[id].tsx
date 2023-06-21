import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";
import ErrorPage from "next/error";
import Link from "next/link";
import { IconHoverEffect } from "~/components/IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";
import { ProfileImage } from "~/components/ProfileImage";
import { InfiniteTweetList } from "~/components/InfiniteTweetList";
import { useSession } from "next-auth/react";
import { Button } from "~/components/Button";
import { useState } from "react";

const TABS = ["Tweets", "Replies", "Media", "Likes"];

const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const { data: profile } = api.profile.getById.useQuery({ id });
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
    { userId: id },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const trpcUtils = api.useContext();
  const toggleFollow = api.profile.toggleFollow.useMutation({
    onSuccess: ({ addedFollow }) => {
      trpcUtils.profile.getById.setData({ id }, (oldData) => {
        if (oldData == null) return;

        const counterModifier = addedFollow ? 1 : -1;

        return {
          ...oldData,
          isFollowing: addedFollow,
          followersCount: oldData.followersCount + counterModifier,
        };
      });
    },
  });

  if (profile == null || profile.name == null) {
    return <ErrorPage statusCode={404} />;
  }

  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Tweets");

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <Head>
        <title>{`Twitter Clone - ${profile.name}`}</title>
      </Head>
      <header className="sticky top-0 z-10 flex-col items-center border-b bg-white/90">
        <div>
          <div className="flex items-center px-4 py-2">
            <Link href=".." className="mr-6">
              <IconHoverEffect className="px-2 py-2">
                <VscArrowLeft className="h-6 w-6" />
              </IconHoverEffect>
            </Link>
            <div>
              <div className="text-xl font-bold">{profile.name}</div>
              <div className="text-sm text-gray-500">
                <span>{profile.tweetsCount} </span>
                {getPlural(profile.tweetsCount, "Tweet", "Tweets")}{" "}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mb-6 h-48 bg-gray-300">
        <ProfileImage
          src={profile.image}
          width={125}
          height={125}
          className="absolute -bottom-10 left-0 cursor-pointer px-6"
        />
      </div>

      <div className="mb-2 flex justify-between px-6 pb-2 pt-6">
        <div>
          <p className="text-xl font-bold">{profile.name}</p>
          <p className="text-gray-500">{profile.email}</p>
          <div className="mt-4 text-gray-500">
            <span className="mr-4">
              <span className="pr-1 font-bold text-black">
                {profile.followsCount}
              </span>
              <span>Following</span>
            </span>
            <span>
              <span className="pr-1 font-bold text-black">
                {profile.followersCount}
              </span>
              {getPlural(profile.followersCount, "Follower", "Followers")}{" "}
            </span>
          </div>
        </div>
        <div>
          <FollowButton
            isFollowing={profile.isFollowing}
            isLoading={toggleFollow.isLoading}
            userId={id}
            onClick={() => toggleFollow.mutate({ userId: id })}
            handleMouseOver={handleMouseOver}
            handleMouseOut={handleMouseOut}
            isHovering={isHovering}
          />
        </div>
      </div>
      <div>
        <div className="flex border-b">
          {TABS.map((tab) => {
            return (
              <button
                key={tab}
                className="relative flex-grow px-4 py-4 hover:bg-gray-200 focus-visible:bg-gray-200"
                onClick={() => setSelectedTab(tab)}
              >
                <span
                  className={`${tab === selectedTab && "font-bold"} text-black`}
                >
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
      </div>
      {(() => {
        switch (selectedTab) {
          case "Tweets":
            return (
              <InfiniteTweetList
                tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
                isError={tweets.isError}
                isLoading={tweets.isLoading}
                hasMore={tweets.hasNextPage}
                fetchNewTweets={tweets.fetchNextPage}
              />
            );
          case "Replies":
            return <h1>Replies</h1>;
          case "Media":
            return <h1>Media</h1>;
          case "Likes":
            return <h1>Likes</h1>;
          default:
            return null;
        }
      })()}
    </>
  );
};

function FollowButton({
  userId,
  isFollowing,
  isLoading,
  onClick,
  handleMouseOver,
  handleMouseOut,
  isHovering,
}: {
  userId: string;
  isFollowing: boolean;
  isLoading: boolean;
  onClick: () => void;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  isHovering: boolean;
}) {
  const session = useSession();

  if (session.status !== "authenticated" || session.data.user.id === userId) {
    return null;
  }
  return (
    <Button
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      disabled={isLoading}
      onClick={onClick}
      border
      buttonType={isFollowing ? "btn-unfollow" : null}
    >
      {isFollowing ? (isHovering ? "Unfollow" : "Following") : "Follow"}
    </Button>
  );
}

const pluralRules = new Intl.PluralRules();
function getPlural(number: number, singular: string, plural: string) {
  return pluralRules.select(number) === "one" ? singular : plural;
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id;

  if (id == null) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id });

  return {
    props: {
      id,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default ProfilePage;
