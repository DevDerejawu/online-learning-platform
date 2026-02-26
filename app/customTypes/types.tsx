//this matches the returned state of useActionState that is validated in zod => state at times of reseting email;  success: is a wheather the reseting is sceeded or not =>boolean , message is the text message that notifys what a user should do next, newPasswod is used to show errors at times of validation if the newMessage fails the zod validation and a user will make it correct based on the error, confirmPassword is do the same thing, but it should be the same with newPassword.

export type resetPasswordActionType = {
  success?: boolean;
  errors?:{
    message?: string;
    newPassword?: string[];
    confirmPassword?: string[];
    }
}

export type newMessageType = {
  success?: boolean;
  message?: string;      
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    guideMessage?: string; 
  };
};
export type typeForFilteredContentsToBuildTable = {
    
      title: string;
      description: string;
      content_type_id: string;
      part: string;
      category_id: string;
      id: string;
      content: string;
      tech_id: string;
      created_by: string;
      content_types:{
        name: string
      }
    }[]
  | null;
export type signUpActionType = {
  success?: boolean;
  errors?:{
    password?:string[];
    email?:string[];
    full_name?: string[]; 
    message?:string
  }
}

//this is used as types for categories, type, content_types table columns
export type optionType = {
    id: string;
    name: string;
  }

  //this is used to for props type when we pass to components
  export type adminActionProps= {
    contentTypes:optionType[];
    techs: optionType[];
    categories: optionType[];
    close?: ()=>void;
    
  };

  //used here to match zod and ts validation
 export type contentsActionType = {
  errors?: {
    title?:string[];
    description?:string[];
    contentTypeId?:string[];
    categoryId?:string[];
    techId?:string[];
    actualContent?:string[];
    part?:string[];
  },
  success?: boolean,
  message?: string
 }