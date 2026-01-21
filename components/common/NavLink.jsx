import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ text, to, mobile }) => (
  <RouterNavLink
    to={to}
    className={`
      relative group transition-colors duration-300
      ${mobile ? 'text-xl font-semibold' : 'text-[15px] tracking-wide'}
    `}
    style={({ isActive }) => ({
      color: isActive ? '#a3d114' : mobile ? '#d4d4d8' : '#d4d4d8' // gray-300
    })}
  >
    {({ isActive }) => (
      <>
        {text}
        {!mobile && <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#a3d114] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>}
      </>
    )}
  </RouterNavLink>
);
export default NavLink;