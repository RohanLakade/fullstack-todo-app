import React, { useEffect, useState } from "react";
import "./FilterModal.scss";
import RenderButton from "@components/utils/render_button/RenderButton";
import RenderSelect from "@components/utils/render-select/RenderSelect";
import { priorityOptionsArr, statusOptionsArr } from "@utils/helpers/helpers";

const FilterModal = ({ isOpen, onClose, onApply, filterObj }) => {
  const [selectedFilters, setSelectedFilters] = useState(null);

  const handleApply = () => {
    onApply(selectedFilters);
  };

  useEffect(() => {
    setSelectedFilters(filterObj);
  }, [filterObj]);

  return (
    <>
      {selectedFilters !== null && (
        <>
          {isOpen && <div className="backdrop" onClick={onClose}></div>}
          <dialog open={isOpen} className="modal">
            <div className="modal-content">
              <div>
                <label htmlFor="status">Status: </label>
                <RenderSelect
                  id="status"
                  name="status"
                  value={selectedFilters?.status}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [e.target.name]: e.target.value,
                    })
                  }
                  optionsArr={statusOptionsArr}
                />
              </div>
              <div>
                <label htmlFor="priority">Priority: </label>
                <RenderSelect
                  id="priority"
                  name="priority"
                  value={selectedFilters?.priority}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      [e.target.name]: e.target.value,
                    })
                  }
                  optionsArr={priorityOptionsArr}
                />
              </div>

              <div className="modal-actions">
                <RenderButton
                  onClick={onClose}
                  text="cancel"
                  className={"primary"}
                />
                <RenderButton
                  onClick={handleApply}
                  text="apply"
                  className={"primary"}
                />
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
};

export default FilterModal;
