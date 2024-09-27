import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-center text-xs gap-4 ml-auto mb-10 [&>a]:border-b-2 [&>a:hover]:border-cyan-400">
      <Link href="/">Pagination button</Link>
      <Link href="/infinite-scroll">Infinite Scroll (plain)</Link>
      <Link href="/infinite-scroll-with-observer">W/ Infinite Scroll with react intersection observer</Link>
    </nav>
  );
};

export default Nav;