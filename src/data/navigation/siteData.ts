interface NavLink {
    href: string;
    label: string;
}

export const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
];

export const siteConfig = {
    name: "Glamour",
    description: "Handcrafted flower arrangements for modern spaces.",
    url: "https://glamour.example.com",
};
