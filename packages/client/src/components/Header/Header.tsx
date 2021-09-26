import { useQuery } from "react-apollo-hooks";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";

import { ME } from "./Header.queries";
import { User } from "@photo-service/contracts";
import {
  Container,
  HeaderColumn,
  HeaderLink,
  HeaderWrapper,
  SearchInput,
} from "./Header.styled";
import { IconLogo } from "../Icons/IconLogo";
import { IconHeartEmpty } from "../Icons/IconHeartEmpty";

interface HeaderProps {
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const { data } = useQuery<{ userProfile: Partial<User> }>(ME);

  const search = useInput("");

  const history = useHistory();

  const handleSearch: React.FormEventHandler = (event) => {
    event.preventDefault();

    if (search.value === "") {
      toast.error("search value is required");
      return;
    }

    history.push("/search?s=" + search.value);
  };

  return (
    <Container>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to={"/"}>
            <IconLogo></IconLogo>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form action="" onSubmit={handleSearch}>
            <SearchInput placeholder={"Search..."} {...search} />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to={"/explore"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 5.999l-5.621 2.986c-.899-.104-1.806.191-2.474.859-.662.663-.95 1.561-.862 2.428l-3.043 5.728 5.724-3.042c.884.089 1.772-.205 2.432-.865.634-.634.969-1.524.859-2.473l2.985-5.621zm-5.97 7.22c-.689 0-1.25-.559-1.25-1.249-.001-.691.559-1.251 1.25-1.25.69 0 1.25.56 1.25 1.25-.001.689-.56 1.249-1.25 1.249z" />
            </svg>
          </HeaderLink>
          <HeaderLink to={"/notifications"}>
            <IconHeartEmpty></IconHeartEmpty>
          </HeaderLink>
          <HeaderLink to={`/${data?.userProfile?.userName ?? ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c3.032 0 5.5 2.467 5.5 5.5 0 1.458-.483 3.196-3.248 5.59 4.111 1.961 6.602 5.253 7.482 8.909h-19.486c.955-4.188 4.005-7.399 7.519-8.889-1.601-1.287-3.267-3.323-3.267-5.61 0-3.033 2.468-5.5 5.5-5.5zm0-2c-4.142 0-7.5 3.357-7.5 7.5 0 2.012.797 3.834 2.086 5.182-5.03 3.009-6.586 8.501-6.586 11.318h24c0-2.791-1.657-8.28-6.59-11.314 1.292-1.348 2.09-3.172 2.09-5.186 0-4.143-3.358-7.5-7.5-7.5z" />
            </svg>
          </HeaderLink>
          {/* <HeaderLink to={"/comment"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </HeaderLink> */}
        </HeaderColumn>
      </HeaderWrapper>
    </Container>
  );
};
