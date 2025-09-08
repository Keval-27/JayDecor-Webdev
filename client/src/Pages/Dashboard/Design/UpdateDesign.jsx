import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SelectField from './AddDesign/SelectField';
import InputField from './AddDesign/Inputfield';
import { useFetchDesignByIdQuery, useUpdateDesignMutation } from '../../../Redux/Features/Designs/designsApi';


const UpdateDesign = () => {
  const { id } = useParams();
  const { data: designData, isLoading, isError, refetch } = useFetchDesignByIdQuery(id);
  const [updateDesign] = useUpdateDesignMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (designData) {
      setValue('title', designData.title);
      setValue('type', designData.type);
      setImages(designData.img || []);
    }
  }, [designData, setValue]);

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
    const updateDesignData = {
      title: data.title,
      type: data.type,
      img: images,
    };
  
    console.log('Submitting updated Design data:', updateDesignData);
  
    try {
      await updateDesign({ id, ...updateDesignData }).unwrap();
      Swal.fire({
        title: 'Design Updated',
        text: 'The Design was updated successfully!',
        icon: 'success',
      });
  
      // Reset the form and clear the images
      reset(); // This clears the form fields managed by react-hook-form
      setImages([]); // Clear the images array
    } catch (error) {
      console.error('Failed to update Design:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update the Design. Please try again.',
        icon: 'error',
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Design data</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Design</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter Design title"
          register={register}
        />

        <SelectField
          label="Type"
          name="type"
            options={[
            { value: '', label: 'Choose A Type' },
            { value: 'Livingroom', label: 'Livingroom' },
            { value: 'Bedroom', label: 'Bedroom' },
            { value: 'kids Bedroom', label: 'Kids Bedroom' },
            { value: 'Kitchen', label: 'Kitchen' },
            { value: 'Wardrobe', label: 'Wardrobe' },
            { value: 'Diningroom', label: 'Diningroom' },
            { value: 'Bathroom', label: 'Bathroom' },
            { value: 'Office', label: 'Office' },
            { value: 'Other', label: 'Other' },
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
          Update Design
        </button>
      </form>
    </div>
  );
};

export default UpdateDesign;
