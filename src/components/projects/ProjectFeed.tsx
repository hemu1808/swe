"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { ProjectData } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export const ProjectFeed: React.FC<{ projects: ProjectData[] }> = ({ projects }) => {
    return (
        <div className="flex-1 w-full flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </AnimatePresence>
        </div>
    );
};
