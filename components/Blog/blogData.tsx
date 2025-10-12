import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Essential Tips for Keeping Your Flowers Fresh",
    paragraph:
      "Learn the best practices for maintaining the beauty and longevity of your flower arrangements with these expert care tips.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Sarah Green",
      image: "/images/blog/author-01.png",
      designation: "Floral Expert",
    },
    tags: ["care"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Seasonal Flower Guide: What's in Bloom",
    paragraph:
      "Discover which flowers are at their peak during different seasons and how to choose the perfect blooms for any occasion.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Michael Bloom",
      image: "/images/blog/author-02.png",
      designation: "Botanist",
    },
    tags: ["seasonal"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Creating Beautiful Bouquets: A Beginner's Guide",
    paragraph:
      "Step-by-step instructions for arranging stunning bouquets at home, from selecting flowers to perfect finishing touches.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "Emma Rose",
      image: "/images/blog/author-03.png",
      designation: "Floral Designer",
    },
    tags: ["arranging"],
    publishDate: "2025",
  },
];
export default blogData;
