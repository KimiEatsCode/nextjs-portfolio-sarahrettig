"use client"
import Link from "next/link";
import { RESUME_URL } from "../constants";
import "bootstrap-icons/font/bootstrap-icons.css";


export const Footer: React.FC = () => {
return (
<footer>
<hr className="pt-5"></hr>
    <div className="container flex items-center mt-2 py-4 mx-auto">
   
         <div className="w-full text-center"> 
            <div className="flex flex-row justify-center gap-6">
                 <Link
                href="/projects"
                className="duration-200 text-black hover:text-black"
            >
                Projects
            </Link>
                <Link
                href={RESUME_URL}
                className="duration-200 text-black hover:text-black"
            >
                Resume
            </Link>
            <Link
                href="/contact"
                className="duration-200 text-black hover:text-black"
            >
                Contact Me
            </Link>
           
            </div>
            <div className="flex flex-row justify-center gap-6">
            <Link
                href="https://github.com/KimiEatsCode/nextjs-portfolio-sarahrettig"
                className="duration-200 text-black hover:text-black"
            >
                Site designed and coded by Sarah Rettig | Github <i className="bi bi-github"></i>
            </Link>
            </div>
            </div>
            </div>
    </footer>
) }