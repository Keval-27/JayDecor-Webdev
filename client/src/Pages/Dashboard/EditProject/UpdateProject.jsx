import React, { useEffect, useState } from 'react';
import InputField from '../AddProject/InputField';
import SelectField from '../AddProject/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchProjectByIdQuery, useUpdateProjectMutation } from '../../../Redux/Features/Projects/projectsApi';
import Swal from 'sweetalert2';

const UpdateProject = () => {
  const { id } = useParams();
  const { data: projectData, isLoading, isError, refetch } = useFetchProjectByIdQuery(id);
  const [updateProject] = useUpdateProjectMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (projectData) {
      setValue('title', projectData.title);
      setValue('desc', projectData.desc);
      setValue('type', projectData.type);
      setImages(projectData.img || []);
    }
  }, [projectData, setValue]);

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(files[0]);
      setImages(newImages);
    }
  };

  const handleAddImage = () => setImages([...images, '']);
  const handleRemoveImage = (index) => setImages(images.filter((_, i) => i !== index));

  const onSubmit = async (data) => {
    const updateProjectData = {
      title: data.title,
      desc: data.desc,
      type: data.type,
      img: images,
    };
  
    console.log('Submitting updated project data:', updateProjectData);
  
    try {
      await updateProject({ id, ...updateProjectData }).unwrap();
      Swal.fire({
        title: 'Project Updated',
        text: 'The project was updated successfully!',
        icon: 'success',
      });
  
      // Reset the form and clear the images
      reset(); // This clears the form fields managed by react-hook-form
      setImages([]); // Clear the images array
    } catch (error) {
      console.error('Failed to update project:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update the project. Please try again.',
        icon: 'error',
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching project data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter project title"
          register={register}
        />
        <InputField
          label="Description"
          name="desc"
          placeholder="Enter project description"
          type="textarea"
          register={register}
        />
        <SelectField
          label="Type"
          name="type"
          options={[
            { value: '', label: 'Choose A Type' },
            { value: 'Residential', label: 'Residential' },
            { value: 'Commercial', label: 'Commercial' },
            { value: 'Mixed-use', label: 'Mixed-use' },
            { value: 'Others', label: 'Others' },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
          {images.map((img, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="w-full"
              />
              {img && (
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 text-white rounded px-3 py-1 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-blue-500 text-white rounded px-4 py-2 text-sm"
          >
            Add Image
          </button>
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
