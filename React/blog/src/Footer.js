import { useStoreState } from "easy-peasy";

function Footer() {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className="Footer">
      <p>{postCount} Post page</p>
    </footer>
  );
}

export default Footer;
