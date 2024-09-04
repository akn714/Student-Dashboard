To perform CRUD (Create, Read, Update, Delete) operations on the `internal_marks_records` field in a MongoDB schema using Mongoose, you can follow the methods shown below. These operations will interact with the `internal_marks_records` array inside the documents in your MongoDB collection.

### 1. **Create Operation (Add Records)**

To add a new record to the `internal_marks_records` field for a student, you can use the `push()` method to append a new record.

#### Example:
```javascript
const addInternalMarksRecord = async (studentId, newRecord) => {
  try {
    // Find the student by ID and push the new record to the internal_marks_records array
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $push: { internal_marks_records: newRecord } },
      { new: true } // Return the updated document
    );
    console.log('Record added:', student);
  } catch (err) {
    console.error('Error adding record:', err);
  }
};

// Example usage:
const newRecord = {
  SUBJECT_CODE: {
    CT: "20",
    AT: "15",
    ATTENDENCE_MARKS: "10",
    ASSIGNMENT_MARKS: "5",
    TOTAL: "50"
  }
};

addInternalMarksRecord("student_id_here", newRecord);
```

### 2. **Read Operation (Retrieve Records)**

To read or retrieve the `internal_marks_records` of a specific student, you can simply query the document and access the `internal_marks_records` field.

#### Example:
```javascript
const getInternalMarksRecords = async (studentId) => {
  try {
    // Find the student by ID and select the internal_marks_records field
    const student = await Student.findById(studentId, 'internal_marks_records');
    console.log('Marks records:', student.internal_marks_records);
  } catch (err) {
    console.error('Error retrieving records:', err);
  }
};

// Example usage:
getInternalMarksRecords("student_id_here");
```

### 3. **Update Operation (Modify a Specific Record)**

To update a specific subject's marks in the `internal_marks_records` array, you can use the `$set` operator combined with an array filter.

#### Example:
```javascript
const updateInternalMarksRecord = async (studentId, subjectCode, updatedMarks) => {
  try {
    // Update the record for the specific SUBJECT_CODE
    const student = await Student.findOneAndUpdate(
      { _id: studentId, "internal_marks_records.SUBJECT_CODE": subjectCode },
      { $set: { "internal_marks_records.$.SUBJECT_CODE": updatedMarks } },
      { new: true } // Return the updated document
    );
    console.log('Updated record:', student);
  } catch (err) {
    console.error('Error updating record:', err);
  }
};

// Example usage:
const updatedMarks = {
  CT: "25",
  AT: "18",
  ATTENDENCE_MARKS: "10",
  ASSIGNMENT_MARKS: "7",
  TOTAL: "60"
};

updateInternalMarksRecord("student_id_here", "SUBJECT_CODE_HERE", updatedMarks);
```

### 4. **Delete Operation (Remove a Specific Record)**

To delete a specific record from the `internal_marks_records` array, use the `$pull` operator to remove it by its `SUBJECT_CODE`.

#### Example:
```javascript
const deleteInternalMarksRecord = async (studentId, subjectCode) => {
  try {
    // Pull the record with the specified SUBJECT_CODE from the array
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { internal_marks_records: { "SUBJECT_CODE": subjectCode } } },
      { new: true } // Return the updated document
    );
    console.log('Record deleted:', student);
  } catch (err) {
    console.error('Error deleting record:', err);
  }
};

// Example usage:
deleteInternalMarksRecord("student_id_here", "SUBJECT_CODE_HERE");
```

### Summary of CRUD Operations:
- **Create**: Add a new entry to the `internal_marks_records` array using `$push`.
- **Read**: Retrieve the `internal_marks_records` array or specific records.
- **Update**: Modify a specific record in the array using `$set` and an array filter.
- **Delete**: Remove a record from the array using `$pull`.

By using these Mongoose methods, you can efficiently manage the `internal_marks_records` field in your MongoDB documents. Let me know if you need more examples or details!