import ProfileButton from "./button/profile-button";
import { Title } from "./title";

const Header = () => {
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <Title />
      <ProfileButton />
    </div>
  );
};

export default Header;
