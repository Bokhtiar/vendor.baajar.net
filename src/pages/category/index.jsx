import React from 'react';
import { DateInput, PassworInput, TextAreaInput, TextInput } from '../../components/input';
import { useForm } from 'react-hook-form';
import ReactDatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
const CategoryShow = () => {
    const { control,trigger } = useForm();
    return (
        <div  >
          <TextInput control={control} name="myname" label="who is back" pos="left" trigger={trigger} required="true" error={true}  className="w-[150px]" type="date"  /> 
        
          <PassworInput control={control} name="myname" label="who is back" pos="left" trigger={trigger} required="true" error={true}  className="w-[150px]  "/>
          
          <TextAreaInput control={control} name="mynamesdf" label="who is back" pos="left" trigger={trigger} required="true" error={true}   className="w-[150px] h-36 " />
           <DateInput  control={control} name="mynamesdf" label="who is back" pos="left" trigger={trigger} required="true" error={true}  className="w-[150px] "   />
        
        </div>
    );
};

export default CategoryShow;