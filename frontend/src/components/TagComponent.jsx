import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ImCross } from "react-icons/im";

const TagComponent = ({ tags: tag, onTagsChange }) => {
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState(tag || []);

    const handleTagInputChange = (event) => {
        setTagInput(event.target.value);
    };

    const handleTagAdd = () => {
        if (tagInput) {
            setTags([...tags, tagInput]);
            setTagInput("");
            onTagsChange([...tags, tagInput]); // Notify parent component of the tag change
        }
    };

    const handleTagRemove = (tagToRemove) => {
        const filteredTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(filteredTags);
        onTagsChange(filteredTags); // Notify parent component of the tag removal
    };

    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            event.preventDefault();
            handleTagAdd();
        }
    };

    return (
        <>
            <div className="flex">
                <input
                    className="p-2 border-1 mt-1 mb-3 w-1/4 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    placeholder="seafood"
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                ></input>
                <Button
                    className="btn-sm m-1 mb-4 mt-2"
                    variant="outline-dark"
                    type="button"
                    onClick={handleTagAdd}
                >
                    Add
                </Button>
            </div>

            <div className="flex mb-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-sm flex border-1 rounded pl-1 pr-1 mr-1"
                    >
                        {tag}
                        <ImCross
                            className="m-1 text-red-700"
                            type="button"
                            onClick={() => handleTagRemove(tag)}
                            onKeyDown={handleKeyPress}
                        />
                    </span>
                ))}
            </div>
        </>
    );
};

export default TagComponent;
