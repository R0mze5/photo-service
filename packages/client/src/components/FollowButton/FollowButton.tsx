import { UserId, UserIsFollowing } from "@photo-service/contracts";
import { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import { FOLLOW_USER, UNFOLLOW_USER } from "./FollowButton.queries";

interface RenderProps {
  onFollow: () => void;
  isFollowing: boolean;
  isLoading: boolean;
}

interface FollowButtonProps {
  id: UserId;
  isFollowing: UserIsFollowing;
  render: (value: RenderProps) => JSX.Element;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing: amIFollowing,
  render,
  id,
}) => {
  const [isFollowing, setIsFollowing] = useState(amIFollowing);

  const [followUserMutation, { loading: followLoading }] = useMutation<{
    followUser: boolean;
  }>(FOLLOW_USER, { variables: { id } });

  const [unfollowUserMutation, { loading: unollowLoading }] = useMutation<{
    unfollowUser: boolean;
  }>(UNFOLLOW_USER, { variables: { id } });

  const onFollow = async (): Promise<void> => {
    const currentIsFollowing = isFollowing;

    try {
      setIsFollowing(!currentIsFollowing);
      if (currentIsFollowing) {
        await unfollowUserMutation();
      } else {
        await followUserMutation();
      }
    } catch (error) {
      setIsFollowing(currentIsFollowing);
      toast.error("can't follow");
    }
  };

  return render({
    onFollow,
    isLoading: followLoading || unollowLoading,
    isFollowing,
  });
};
