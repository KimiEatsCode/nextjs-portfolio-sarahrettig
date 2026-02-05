"use client"
import Link from "next/link"; 


export const Footer: React.FC = () => {
return (
<footer>
    <div className="container flex items-center py-4 mx-auto">
         <div className ="flex-col"> 
            
            <div className="flex-row">
                 <Link
                href="/projects"
                className="duration-200 text-black hover:text-black"
            >
                Projects
            </Link>
            </div>
            <div className="flex-row">
                <Link
                href="https://drive.google.com/file/d/1ciS0_BLVzV3XoPgdwl5MO4eIXh9_me0d/view?usp=sharing"
                className="duration-200 text-black hover:text-black"
            >
                Resume
            </Link>
            </div>
            <div className="flex-row">
            <Link
                href="/courses"
                className="duration-200 text-black hover:text-black"
            >
                Your Favorites
            </Link>
            </div>
            <div className="flex-row">
            <Link
                href="/contact"
                className="duration-200 text-black hover:text-black"
            >
                Contact Me
            </Link>
            </div>
            </div>
            </div>
    </footer>
) }