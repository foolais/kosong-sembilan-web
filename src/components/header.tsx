import LogoutButton from "./logout-button";
import { Title } from "./title";

const Header = () => {
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <Title />
      <LogoutButton />
    </div>
  );
};

export default Header;
