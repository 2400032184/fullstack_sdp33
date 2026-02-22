import React, { useState, useEffect } from "react";

<<<<<<< HEAD
const allLanguages = ["English","Hindi","Bengali","Telugu","Marathi","Tamil","Urdu","Gujarati","Kannada","Odia","Malayalam","Punjabi","Assamese","Maithili","Sanskrit","Kashmiri","Nepali","Sindhi","Dogri","Manipuri","Bodo","Santhali","French","Spanish","German","Italian","Chinese","Japanese","Korean","Russian","Arabic","Portuguese","Swahili","Turkish","Vietnamese","Dutch","Greek"];
const allOccupations = ["Software Engineer","Doctor","Teacher","Student","Artist","Lawyer","Engineer","Nurse","Farmer","Scientist","Business Owner","Musician","Writer","Driver","Chef"];
=======
const allLanguages = [
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
  "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", 
  "Maithili", "Sanskrit", "Kashmiri", "Nepali", "Sindhi", "Dogri", 
  "Manipuri", "Bodo", "Santhali", "French", "Spanish", "German", 
  "Italian", "Chinese", "Japanese", "Korean", "Russian", "Arabic",
  "Portuguese", "Swahili", "Turkish", "Vietnamese", "Dutch", "Greek"
];

const allOccupations = [
  "Software Engineer", "Doctor", "Teacher", "Student", "Artist", "Lawyer",
  "Engineer", "Nurse", "Farmer", "Scientist", "Business Owner", "Musician",
  "Writer", "Driver", "Chef"
];

>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
const allGenders = ["Male", "Female", "Other"];
const allBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const allMaritalStatus = ["Single", "Married", "Divorced", "Widowed"];

<<<<<<< HEAD
const UpdateUserProfile = () => {
  const defaultData = {
    profilePic: "",
=======
const UpdateUserProfile = ({ onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    profilePic: null,
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
    username: "",
    name: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodType: "",
    maritalStatus: "",
    languages: [],
    occupation: "",
    placeOfBirth: "",
<<<<<<< HEAD
  };

  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFormData({ ...defaultData, ...currentUser }); // merge with defaults
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
=======
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setFormData(currentUser);
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === "languages") {
      if (checked) {
<<<<<<< HEAD
        setFormData((prev) => ({ ...prev, languages: [...prev.languages, value] }));
      } else {
        setFormData((prev) => ({ ...prev, languages: prev.languages.filter(l => l !== value) }));
=======
        setFormData((prev) => ({
          ...prev,
          languages: [...prev.languages, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          languages: prev.languages.filter((lang) => lang !== value),
        }));
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
      }
    } else if (name === "dob") {
      const birthDate = new Date(value);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData((prev) => ({ ...prev, dob: value, age }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    localStorage.setItem("currentUser", JSON.stringify(formData));

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedUsers = users.map(u => u.username === formData.username ? { ...formData } : u);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
=======

    localStorage.setItem("currentUser", JSON.stringify(formData));

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedUsers = users.map((u) =>
      u.username === formData.username ? { ...formData } : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
    if (onProfileUpdate) onProfileUpdate(formData);
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
  };

  return (
    <div className="update-profile-container">
<<<<<<< HEAD
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
=======
      <h1 className="update-title">Update Your Profile</h1>
      <form className="update-profile-form" onSubmit={handleSubmit}>
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
        <label>
          Profile Picture:
          <input type="file" name="profilePic" onChange={handleChange} />
        </label>

        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

<<<<<<< HEAD
        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={formData.age} readOnly />
        </label>
=======
        <div style={{ display: "flex", gap: "15px" }}>
          <label style={{ flex: 1 }}>
            Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </label>
          <label style={{ flex: 1 }}>
            Age:
            <input type="number" name="age" value={formData.age} readOnly />
          </label>
        </div>
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
<<<<<<< HEAD
            {allGenders.map(g => <option key={g} value={g}>{g}</option>)}
=======
            {allGenders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
          </select>
        </label>

        <label>
<<<<<<< HEAD
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
=======
          Phone Number:
          <input
            type="text"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
          />
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <label>
          Blood Type:
          <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
            <option value="">Select Blood Type</option>
<<<<<<< HEAD
            {allBloodTypes.map(b => <option key={b} value={b}>{b}</option>)}
=======
            {allBloodTypes.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
          </select>
        </label>

        <label>
          Marital Status:
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select Marital Status</option>
<<<<<<< HEAD
            {allMaritalStatus.map(m => <option key={m} value={m}>{m}</option>)}
=======
            {allMaritalStatus.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
          </select>
        </label>

        <label>
<<<<<<< HEAD
          Languages:
          <div style={{ maxHeight: "150px", overflowY: "scroll", border: "1px solid #ccc", padding: "5px" }}>
            {allLanguages.map(lang => (
              <label key={lang} style={{ display: "block" }}>
                <input type="checkbox" name="languages" value={lang} checked={formData.languages.includes(lang)} onChange={handleChange} />
=======
          Languages Spoken:
          <div className="languages-container">
            {allLanguages.map((lang) => (
              <label key={lang} className="language-checkbox">
                <input
                  type="checkbox"
                  name="languages"
                  value={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={handleChange}
                />
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
                {lang}
              </label>
            ))}
          </div>
<<<<<<< HEAD
=======
          <p>Selected ({formData.languages.length}): {formData.languages.join(", ")}</p>
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
        </label>

        <label>
          Occupation:
          <select name="occupation" value={formData.occupation} onChange={handleChange}>
            <option value="">Select Occupation</option>
<<<<<<< HEAD
            {allOccupations.map(o => <option key={o} value={o}>{o}</option>)}
=======
            {allOccupations.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
          </select>
        </label>

        <label>
          Place of Birth:
          <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
        </label>

<<<<<<< HEAD
        <button type="submit">Save Changes</button>
=======
        <button type="submit" className="submit-btn">Save Changes</button>
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
      </form>

      <style>{`
        .update-profile-container {
<<<<<<< HEAD
          max-width: 700px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          text-align: left;
        }

        h1 {
          text-align: center;
          color: #4a148c;
          margin-bottom: 25px;
        }

        form label {
          display: block;
          margin-bottom: 15px;
=======
          max-width: 900px;
          margin: 50px auto;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          color: #4a4a4a;
        }

        .update-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #000000ff;
        }

        .update-profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label {
          display: flex;
          flex-direction: column;
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
          font-weight: 500;
        }

        input, select {
<<<<<<< HEAD
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        button {
          display: block;
          margin: 20px auto 0;
          padding: 12px 25px;
          background: linear-gradient(135deg, #a78bfa, #d6bcf5);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background: linear-gradient(135deg, #7c3aed, #c084fc);
        }
=======
          margin-top: 8px;
          padding: 12px;
          border: 1px solid #dcdcdc;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: #faf0f8;
        }

        input:focus, select:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
          background-color: #fbfbfbff;
        }

        .languages-container {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ccc;
          border-radius: 12px;
          padding: 10px;
          background-color: #fffaf5;
          display: flex;
          flex-direction: column;
        }

        .language-checkbox {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
        }

        .submit-btn {
          padding: 14px 22px;
          background: linear-gradient(135deg, #a78bfa, #d6bcf5);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #7c3aed, #c084fc);
        }

        @media (max-width: 768px) {
          .update-profile-container {
            padding: 25px;
          }

          .update-title {
            font-size: 1.6rem;
          }
        }
>>>>>>> 585b72d6918f295391735207687755fbb6c4beec
      `}</style>
    </div>
  );
};

export default UpdateUserProfile;
