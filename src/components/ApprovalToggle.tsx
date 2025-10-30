import React from "react";

interface Props {
    approved: boolean;
    onChange: (next: boolean) => void;
}

const ApprovalToggle: React.FC<Props> = ({ approved, onChange }) => {
    return (
        <button
            aria-pressed={approved}
            onClick={() => onChange(!approved)}
            className={`px-2 py-1 rounded text-sm ${approved ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
            title={approved ? "Approved – click to hide" : "Hidden – click to approve"}
        >
            {approved ? "Approved" : "Hidden"}
        </button>
    );
};

export default ApprovalToggle;