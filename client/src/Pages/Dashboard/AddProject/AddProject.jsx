import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAddProjectMutation } from '../../../Redux/Features/Projects/projectsApi';

const AddProject = () => { // Changed the component name to AddProject
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [images, setImages] = useState([]); // State for multiple images
  const [addProject, { isLoading }] = useAddProjectMutation();

  const onSubmit = async (data) => {
    const newProjectData = {
      ...data,
      img: images, // Add the images array to the project data
      type: data.type || 'Commercial', // Default type if not selected
    };

    try {
      await addProject(newProjectData).unwrap();
      Swal.fire({
        title: "Project added",
        text: "Your project is uploaded successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK!",
        
      });
      reset();
      setImages([]); // Clear images after submission
    } catch (error) {
      console.error('Error adding project:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to add the project. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleAddImage = () => {
    setImages([...images, '']); // Add a new empty entry for images
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };
  

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Project</h2> {/* Updated title */}

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter project title"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="desc"
          placeholder="Enter project description"
          type="textarea"
          register={register}
        />

        {/* Reusable Select Field for Type */}
        <SelectField
          label="Type"
          name="type"
          options={[
            { value: '', label: 'Choose A Type' },
            { value: 'Residential', label: 'Residential' },
            { value: 'Commercial', label: 'Commercial' },
         
          ]}
          register={register}
        />

        {/* Images Section */}
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

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          {isLoading ? <span>Adding...</span> : <span>Add Project</span>}
        </button>
      </form>
    </div>
  );
};

export default AddProject; // Changed export to AddProject