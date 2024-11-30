import { Link } from "react-router-dom";

import { Card, CardContent } from "../ui/card";
import  PlaceholderImg  from "./placeholder.png";

export default function PlaceholderContent({
    children,
    justifyCenter = true,
}) {
    return (
        <Card className="rounded-lg border-none mt-4">
            <CardContent className="p-4">
                <div
                    className={`flex ${justifyCenter && "justify-center items-center"
                        } min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] w-full`}
                >
                    <div className="flex flex-col relative w-full">
                        {children ? (
                            children
                        ) : (
                            <>
                                <img
                                    src= {PlaceholderImg}
                                    alt="Placeholder Image"
                                    width={500}
                                    height={500}
                                    priority
                                />
                                
                                <div className="absolute -bottom-8 right-0">
                                    <Link
                                        href="https://www.freepik.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-muted-foreground"
                                    >
                                        Designed by Freepik
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
