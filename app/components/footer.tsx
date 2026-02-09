"use client"
import Link from "next/link";
import { RESUME_URL } from "../constants";


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
                href={RESUME_URL}
                className="duration-200 text-black hover:text-black"
            >
                Resume
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