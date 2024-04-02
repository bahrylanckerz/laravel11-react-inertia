import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {
                links.map((link) => (
                    <Link 
                        preserveScroll
                        key={link.label}
                        href={link.url || ""}
                        className={
                            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " + 
                            (link.active ? "bg-gray-950 " : " ") +
                            (!link.url ? "!text-gray-500 cursor-not-allowed" : "hover:bg-gray-950")
                        } 
                        dangerouslySetInnerHTML={{ __html: (link.label == 'pagination.previous') ? 'Previous' : (link.label == 'pagination.next') ? 'Next' : link.label }}
                    >
                    </Link>
                ))
            }
        </nav>
    )
}