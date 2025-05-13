import { useState } from "react";
import { useController } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import ReactDatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
const customInputFieldDesign = (props, pos) => {
  const labelPosition = () => {
    if (pos === "left") {
      return `${
        props?.error
          ? "border-red-500"
          : "border-lightBorder dark:border-darkBorder"
      } text-sm bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-darkTitle flex gap-1   flex-grow border rounded-l-md p-[14px] block ${
        props?.className
      }`;
    } else if (pos === "top") {
      return `${
        props?.error
          ? "border-red-500"
          : "border-lightBorder dark:border-darkBorder"
      } text-sm   text-lightTitle dark:text-darkTitle  text-left px-1 py-2 ${
        props?.className
      }`;
    } else if (pos === "right") {
      return `${
        props?.error
          ? "border-red-500"
          : "border-lightBorder dark:border-darkBorder"
      } text-sm bg-lightCard dark:bg-darkCard text-lightTitle dark:text-darkTitle flex gap-1   flex-grow border rounded-r-md p-[14px] block ${
        props?.className
      }`;
    } else {
      return `${
        props?.error
          ? "border-red-500"
          : "border-lightBorder dark:border-darkBorder"
      } text-sm   text-lightTitle dark:text-darkTitle  text-left px-1 py-2 ${
        props?.className
      }`;
    }
  };
  const inputAreaPosition = () => {
    if (pos === "left") {
      return "flex items-center items-center bg-green-900  ";
    } else if (pos === "right") {
      return "flex items-center flex-row-reverse bg-green  ";
    } else {
      return "flex flex-col ";
    }
  };
  const inputPosition = () => {
    if (props?.variant === "left") {
      return props?.error
        ? `w-full text-sm  disabled:bg-gray-300 rounded-r-md outline-none p-[14px] border border-red-500 ${props?.className} bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-light`
        : `w-full text-sm   disabled:bg-gray-300 bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-light rounded-r-md outline-none p-[14px] border border-lightBorder dark:border-darkBorder disabled:border-gray-300 ${props?.className}`;
    } else if (props?.variant === "right") {
      return props?.error
        ? `w-full text-sm  disabled:bg-gray-300 rounded-l-md outline-none p-[14px] border border-red-500 ${props?.className} bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-light`
        : `w-full text-sm  disabled:bg-gray-300 bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-darkTitle rounded-l-md outline-none p-[14px] border border-lightBorder dark:border-darkBorder disabled:border-gray-300 ${props?.className}`;
    } else {
      return props?.error
        ? `w-full text-sm   disabled:bg-gray-300 rounded-r-md outline-none p-[14px] border border-red-500 ${props?.className} bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-light`
        : `w-full text-sm   disabled:bg-gray-300 bg-lightCard dark:bg-darkCard   text-lightTitle dark:text-darkTitle  outline-none p-[14px] border border-lightBorder dark:border-darkBorder disabled:border-gray-300 ${props?.className}`;
    }
  };
  return {
    labelPosition: labelPosition(),
    inputAreaPosition: inputAreaPosition(),
    inputPosition: inputPosition(),
  };
};
/* Text input */
export const TextInput = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
    // value:props.value
  });
  const handleValidation = (e) => {
    onChange(e); // Sync value with React Hook Form
    onBlur(e);
    props.trigger(props.name); // Validate field in real-time
  };
  const { inputAreaPosition, labelPosition, inputPosition } =
    customInputFieldDesign(props, props.pos);
  return (
    <div>
      <div className={inputAreaPosition}>
        <div className={labelPosition}>
          <div className="flex items-center text-start">
            {props?.label} {props?.rules?.required ? "*" : ""}
          </div>
        </div>

        <input
          onChange={handleValidation} // send value to hook form
          onBlur={handleValidation} // notify when input is touched/blur
          value={value || ""} // input value
          name={props.name} // send down the input name
          placeholder={props.placeholder}
          disabled={props.disabled}
          type={props.type || "text"}
          defaultValue={props?.defaultValue}
          min={0}
          className={inputPosition}
        />
      </div>
      {props?.error && (
        <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
      )}
    </div>
  );
};
// password input
export const PassworInput = (props) => {
  const [show, setShow] = useState(false);
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
    // value:props.value
  });
  const handleValidation = (e) => {
    onChange(e); // Sync value with React Hook Form
    onBlur(e);
    props.trigger(props.name); // Validate field in real-time
  };
  const { inputAreaPosition, labelPosition, inputPosition } =
    customInputFieldDesign(props, props.pos);
  return (
    <div>
      <div className={inputAreaPosition}>
        <div className={labelPosition}>
          <div className="flex items-center text-start">
            {props?.label} {props?.rules?.required ? "*" : ""}
          </div>
        </div>

        <div className="w-full relative">
          <input
            onChange={handleValidation} // send value to hook form
            onBlur={handleValidation} // notify when input is touched/blur
            value={value} // input value
            name={props.name} // send down the input name
            placeholder={props.placeholder}
            type={show ? "text" : "password"}
            disabled={props.disabled}
            className={inputPosition}
          />
          {props?.error && (
            <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
          )}
          {show ? (
            <AiOutlineEye
              size={21}
              className="cursor-pointer absolute top-4 right-3 text-gray-500"
              onClick={() => setShow(!show)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={21}
              className="cursor-pointer absolute top-4 right-3 text-gray-500"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
      </div>
      {props?.error && (
        <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
      )}
    </div>
  );
};
/* Textarea input */
export const TextAreaInput = (props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    name: props.name,
    control: props.control,
    rules: { ...props.rules },
    defaultValue: props.defaultvalue,
  });
  const { inputAreaPosition, labelPosition, inputPosition } =
    customInputFieldDesign(props, props.pos);
  return (
    <div>
        <div className={inputAreaPosition}>
      <div className={labelPosition}>
        <div className="flex items-center text-start h-full py-[10px]">
          {props?.label} {props?.rules?.required ? "*" : ""}
        </div>
      </div>

      <textarea
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={props.name} // send down the input name
        placeholder={props.placeholder}
        disabled={props.disabled}
        rows={props.rows}
        className={inputPosition}
      />
    </div>
    {props?.error && (
        <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
      )}
    </div>
  );
};

// date picker 
export const DateInput = (props) => {
    const {
      field: { onChange, onBlur, value, ref },
    } = useController({
      name: props.name,
      control: props.control,
      rules: { ...props.rules },
      defaultValue: props.defaultvalue ? new Date(props.defaultvalue) : null,
    });
    const { inputAreaPosition, labelPosition, inputPosition } =
    customInputFieldDesign(props, props.pos);
    return (
      <div className="  w-full">
        <div className={inputAreaPosition}>
        <div className={labelPosition}>
          <div className="flex items-center text-start">
            {props?.label} {props?.rules?.required ? "*" : ""}
          </div>
        </div>
  
        <div className="w-full">
          <ReactDatePicker
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
            value={value} // input value
            name={props.name} // send down the input name
            ref={ref} // send input ref, so we can focus on input when error appear
            placeholderText={props.placeholder}
            selected={value ? new Date(value) : null}
            disabled={props.disabled}
            dateFormat="dd-MM-yyyy"
              className={inputPosition}
            style={{ 
                width:'100%'
             }}
          />
        </div>
        </div>
        {props?.error && (
        <p className="text-xs text-red-500 pl-3.5">{props?.error}</p>
      )}
      </div>
    );
  };
  