import React, { useState, useRef } from 'react';

const TagInput = () => {
    const [tags, setTags] = useState([]);
    const inputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault();
            const tag = e.target.value.trim();
            if (tag && !tags.includes(tag)) {
                setTags([...tags, tag]);
            }
            e.target.value = '';
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap p-2 border border-gray-300 rounded">
            {tags.map((tag, index) => (
                <div className={"bg-indigo-200 text-indigo-700 text-sm font-medium mx-1 my-1 px-2 py-1 rounded cursor-pointer"} onClick={() => handleTagRemove(tag)}>
                    <span
                        key={index}
                        className="mr-2"
                    >
                      {tag}
                    </span>
                    &times;
                </div>
            ))}
            <input
                ref={inputRef}
                type="text"
                className="outline-none rounded-md w-full"
                onKeyDown={handleKeyDown}
                placeholder="Press space to add tag"
            />
        </div>
    );
};

export default TagInput;