import { useState } from "react";
import "./MissionForm.css";
import Dropdown from "../Dropdown/Dropdown";

const MIN_DATE = "1900-01-01";
const MAX_DATE = "2099-12-31";

export interface MissionFormData {
  name: string;
  description: string;
  status: string;
  priority: string;
  startDate: string;
  targetDate: string;
}

interface MissionFormProps {
  title?: string;
  submitLabel?: string;

  priorities: string[];
  statuses: string[];

  initialValues?: Partial<MissionFormData>;

  onSubmit: (data: MissionFormData) => void | Promise<void>;
}

function MissionForm({
  title = "Create Mission",
  submitLabel = "Create Mission",

  priorities,
  statuses,

  initialValues,

  onSubmit,
}: MissionFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");

  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );

  const [status, setStatus] = useState(
    initialValues?.status ?? statuses[0] ?? "",
  );

  const [priority, setPriority] = useState(
    initialValues?.priority ?? priorities[0] ?? "",
  );

  const [startDate, setStartDate] = useState(initialValues?.startDate ?? "");

  const [targetDate, setTargetDate] = useState(initialValues?.targetDate ?? "");

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!name.trim()) {
      setError("Mission name is required.");
      return;
    }

    if (!description.trim()) {
      setError("Mission description is required.");
      return;
    }

    const formData: MissionFormData = {
      name: name.trim(),
      description: description.trim(),
      status,
      priority,
      startDate,
      targetDate,
    };

    try {
      setSubmitting(true);

      await onSubmit(formData);

      // Clear the form after successful submission
      setName("");
      setDescription("");
      setStatus(statuses[0] ?? "");
      setPriority(priorities[0] ?? "");
      setStartDate("");
      setTargetDate("");
    } catch (error) {
      console.error("Failed to submit mission:", error);

      setError(
        error instanceof Error ? error.message : "Failed to submit mission.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mission-form" onSubmit={handleSubmit}>
      <h2>{title}</h2>

      {error && <div className="form-error">❌ {error}</div>}

      {/* Mission name */}

      <div className="form-group">
        <label htmlFor="mission-name">
          Mission Name <span className="required">*</span>
        </label>

        <input
          id="mission-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Explore Mars"
          disabled={submitting}
        />
      </div>

      {/* Description */}

      <div className="form-group">
        <label htmlFor="mission-description">
          Description <span className="required">*</span>
        </label>

        <textarea
          id="mission-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What is this mission about?"
          disabled={submitting}
        />
      </div>

      {/* Status + Priority */}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mission-status">Status</label>

          <select
            id="mission-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            disabled={submitting}
          >
            {statuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mission-priority">Priority</label>

          <select
            id="mission-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            disabled={submitting}
          >
            {priorities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates */}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mission-start-date">Start Date</label>

          <input
            id="mission-start-date"
            type="date"
            value={startDate}
            min={MIN_DATE}
            max={MAX_DATE}
            onChange={(event) => setStartDate(event.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="mission-target-date">Target Date</label>

          <input
            id="mission-target-date"
            type="date"
            value={targetDate}
            min={MIN_DATE}
            max={MAX_DATE}
            onChange={(event) => setTargetDate(event.target.value)}
            disabled={submitting}
          />
        </div>
      </div>

      {/* Submit */}

      <button type="submit" disabled={submitting}>
        {submitting ? "🚀 Launching..." : submitLabel}
      </button>
    </form>
  );
}

export default MissionForm;
