import {create} from 'zustand';

const useAddStore = create( (set) => ({
    projectData:  {
        title: "",
        description: "",
        tools: "",
        category: ""
    },
    setProjectData : (newData) => set((state) => ({
        projectData: {...state.projectData, ...newData}
    })),
    fileData: {
        images: [],
        video: [],
        sourceCode: [],
        ppt: []
    },
    setFileData: (newData) => set((state) => ({ 
        fileData: {...state.fileData, ...newData} 
    })),
    errors: null,
    setErrors: (newError) => set({errors: newError})
}) );

export default useAddStore;