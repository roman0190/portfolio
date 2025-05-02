"use client";
import React, { useState, useEffect } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import swal from "sweetalert";

const defaultProject = {
  id: "",
  title: "",
  description: "",
  image: null,
  tag: ["All"], // "All" is always included by default
  gitUrl: "",
  previewUrl: "",
};

const page = () => {
  const [inputId, setInputId] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [project, setProject] = useState(defaultProject);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // added loading state

  useEffect(() => {
    if (localStorage.getItem("adminPass")) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      const fetchProjects = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "projects"));
          const projectsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProjects(projectsData);
        } catch (error) {
          console.error("Error fetching projects", error);
        }
      };
      fetchProjects();
    }
  }, [authenticated]);

  const handleAuth = async () => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId: inputId }),
    });
    if (response.ok) {
      localStorage.setItem("adminPass", inputId);
      setAuthenticated(true);
    } else {
      swal("Error", "Invalid admin ID", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files, checked, options } = e.target;
    if (name === "tag" && type === "checkbox") {
      setProject((prev) => {
        let newTags = [...prev.tag];
        if (checked) {
          // add value if not present
          if (!newTags.includes(value)) newTags.push(value);
        } else {
          // remove value if unchecked
          newTags = newTags.filter((tag) => tag !== value);
        }
        return { ...prev, tag: newTags };
      });
    } else if (name === "tag" && options) {
      const selectedTags = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setProject((prev) => ({
        ...prev,
        [name]: selectedTags,
      }));
    } else {
      setProject((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleAddOrUpdateProject = async () => {
    setLoading(true); // start loading
    // Ensure "All" is always present
    if (!project.tag.includes("All")) {
      project.tag = ["All", ...project.tag];
    }

    if (!project.title.trim()) {
      setLoading(false);
      swal("Error", "Please enter the Title", "error");
      return;
    }
    if (!project.description.trim()) {
      setLoading(false);
      swal("Error", "Please enter the Description", "error");
      return;
    }
    if (!project.tag.length) {
      setLoading(false);
      swal("Error", "Please select at least one Tag", "error");
      return;
    }
    if (!project.gitUrl.trim()) {
      setLoading(false);
      swal("Error", "Please enter the Git URL", "error");
      return;
    }
    if (!project.previewUrl.trim()) {
      setLoading(false);
      swal("Error", "Please enter the Preview URL", "error");
      return;
    }
    if (!project.image && !editingId) {
      setLoading(false);
      swal("Error", "Please select an image file", "error");
      return;
    }

    let imageUrl = project.image;
    if (project.image && typeof project.image !== "string") {
      // Save all images in one folder: "projectImages"
      const imageRef = ref(
        storage,
        `projectImages/${project.image.name}-${Date.now()}`
      );
      const snapshot = await uploadBytes(imageRef, project.image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    if (editingId) {
      try {
        const projectRef = doc(db, "projects", editingId);
        await updateDoc(projectRef, { ...project, image: imageUrl });
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingId
              ? { ...project, id: editingId, image: imageUrl }
              : p
          )
        );
        swal("Success", "Project updated successfully", "success");
        setEditingId(null);
      } catch (error) {
        setLoading(false);
        swal("Error", "Error updating project info: " + error, "error");
        return;
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "projects"), {
          ...project,
          image: imageUrl,
        });
        setProjects((prev) => [
          ...prev,
          { ...project, id: docRef.id, image: imageUrl },
        ]);
        swal("Success", "Project saved successfully", "success");
      } catch (error) {
        setLoading(false);
        swal("Error", "Error saving project info: " + error, "error");
        return;
      }
    }

    setProject(defaultProject);
    setLoading(false); // end loading
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this project!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteDoc(doc(db, "projects", id));
          setProjects((prev) => prev.filter((p) => p.id !== id));
          swal("Success", "Project deleted successfully", "success");
        } catch (error) {
          swal("Error", "Error deleting project: " + error, "error");
        }
      }
    });
  };

  const handleEdit = (id) => {
    const projectToEdit = projects.find((p) => p.id === id);
    if (projectToEdit) {
      setProject(projectToEdit);
      setEditingId(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
      {!authenticated ? (
        <div className="bg-white text-black p-8 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Enter Admin ID
          </h2>
          <input
            type="password"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Admin ID"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <button
            onClick={handleAuth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Project Management
          </h2>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Add / Update Project</h3>
            <input
              name="title"
              value={project.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <textarea
              name="description"
              value={project.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border border-gray-300 rounded p-2 w-full mb-4"
              rows="3"
            />
            {/* Removed visible "All" checkbox and only show checkboxes for Web and Mobile */}
            <div className="mb-4">
              <span className="mr-4 font-semibold">Tag:</span>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="tag"
                  value="Web"
                  checked={project.tag.includes("Web")}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                Web
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  name="tag"
                  value="Mobile"
                  checked={project.tag.includes("Mobile")}
                  onChange={handleInputChange}
                  className="mr-1"
                />
                Mobile
              </label>
              <label>
                <input
                  type="checkbox"
                  name="tag"
                  value="Game"
                  checked={project.tag.includes("Game")}
                  onChange={handleInputChange}
                  className="ml-1"
                />
                Game
              </label>
              {/* Hidden input to preserve "All" */}
              <input type="hidden" name="tag" value="All" />
            </div>
            <input
              name="gitUrl"
              value={project.gitUrl}
              onChange={handleInputChange}
              placeholder="Git URL"
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <input
              name="previewUrl"
              value={project.previewUrl}
              onChange={handleInputChange}
              placeholder="Preview URL"
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              className="mb-4"
            />
            <button
              onClick={handleAddOrUpdateProject}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading} // disable button during loading
            >
              {loading
                ? "Loading..."
                : editingId
                ? "Update Project"
                : "Save Project"}
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Existing Projects</h3>
            <ul className="space-y-2">
              {projects.map((proj) => (
                <li
                  key={proj.id}
                  className="flex items-center justify-between border border-gray-200 rounded p-2"
                >
                  <strong>{proj.title}</strong>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(proj.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
