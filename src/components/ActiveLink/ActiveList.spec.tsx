import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("renders correctly", () => {
    const { getByAltText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByAltText("Home")).toBeInTheDocument();
  });

  it("adds active class if the link as currently active", () => {
    const { getByAltText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(getByAltText("Home")).toHaveClass("active");
  });
});
