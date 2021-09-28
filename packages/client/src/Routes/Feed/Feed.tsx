import { Post } from "@photo-service/contracts";
import { useQuery } from "react-apollo-hooks";
import { Loader } from "src/components/Loader";
import Helmet from "react-helmet";
import { PostItem } from "src/components/PostItem";
import { GET_MY_FEED } from "./Feed.queries";
import { Container } from "./Feed.styled";

export const Feed: React.FC = () => {
  const { data, loading } = useQuery<{
    getFeed: Array<Post>;
  }>(GET_MY_FEED, { fetchPolicy: "no-cache" });

  return (
    <Container>
      <Helmet>
        <title>FEED | Photo service</title>
      </Helmet>
      {loading && <Loader></Loader>}
      {!loading &&
        data?.getFeed &&
        data.getFeed.map((post) => (
          <PostItem key={post.id} {...post}></PostItem>
        ))}
    </Container>
  );
};
