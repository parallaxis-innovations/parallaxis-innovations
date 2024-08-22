"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ProjectItemList = ({ imageUrl, title, description, link, shortDescription }) => (
  <div className="project-item bg-blue-50 rounded-lg shadow-md p-4">
    <img src={imageUrl} alt={title} width={200} height={300} className="rounded-lg w-full h-80 object-cover" />
    <div className="pt-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
        <p className="text-gray-600 mt-2">{shortDescription}</p> 
        {description && <p className="text-gray-500 mt-1">{description}</p>} 
      </div>
      <Link href={link} className="text-blue-600 hover:underline mt-2 self-start">
        Read More
      </Link>
    </div>
  </div>
);

const Page = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const backendUrl = 'http://localhost:8000/projects';
        const response = await fetch(backendUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch projects from backend');
        }
        const data = await response.json();
        if (Array.isArray(data.records)) {
          setProjects(data.records);
        } else {
          throw new Error('Fetched data is not an array or does not contain a projects array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return (
    <div>
      {/* Header */}
      <div className="bg-cover bg-center h-screen flex items-center justify-center relative" style={{ backgroundImage: `url('/bg.png')` }}>
        <h1 className="relative text-white font-bold font-mono text-4xl sm:text-6xl text-center">
          Our Projects
        </h1>
      </div>

      <div className="bg-[#0D1C9A] py-8"> 
        <div className="container mx-auto px-4 py-8 bg-[#0D1C9A] rounded-lg"> 
          {isLoading && <div className="text-center">Loading projects...</div>}
          {error && <div className="text-red-500 text-center">Error: {error}</div>}
          
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
              {projects.map((project, index) => (
                <ProjectItemList
                  key={project.id || index}
                  imageUrl={project.img}
                  title={project.title}
                  description={project.short_description}
                  shortDescription={project.description} 
                  link={`/projects/${project.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
