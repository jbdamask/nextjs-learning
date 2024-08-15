import Link from 'next/link';
import NavLink from './nav-link';
import classes from './main-header.module.css';

export default function MainHeader() {

  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/" className={classes.logo}>NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/news">News</NavLink>
          </li>
          <li>
            <NavLink href="/archive">Archive</NavLink>
          </li>          
        </ul>
      </nav>
    </header>
  );
}

// import Link from "next/link";
// import logo from "@/assets/doom-machine.jpeg";
// import classes from "./main-header.module.css";
// import Image from "next/image";
// import MainHeaderBackground from "./main-header-background";
// import NavLink from "./nav-link";

// export default function MainHeader() {

//   return (
//     <>
//       <MainHeaderBackground />
//       <header className={classes.header}>
//         <Link href="/" className={classes.logo}>
//           <Image src={logo} alt="The Doom Machine" priority />
//           The Doom Machine
//         </Link>

//         <nav className={classes.nav}>
//           <ul >
//             <li>        
//               <NavLink href="/news">Doom</NavLink>
//             </li>
//       </ul>
//     </nav>
//       </header>
//     </>
//   );
// }