import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image, // Import Image component
  Linking, // Import Linking for opening external links (e.g., PDF in browser)
} from 'react-native';
import Checkbox from 'expo-checkbox'; // Assuming expo-checkbox is available
import * as DocumentPicker from 'expo-document-picker'; // Import expo-document-picker

/**
 * Helper function to check if a file URI is likely an image.
 * This is a simple check based on file extension.
 * @param {string} uri - The URI of the file.
 * @returns {boolean} True if the URI suggests an image file, false otherwise.
 */
const isImageFile = (uri) => {
  if (!uri) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.tif'];
  const lowerCaseUri = uri.toLowerCase();
  return imageExtensions.some(ext => lowerCaseUri.endsWith(ext));
};

/**
 * Helper function to check if a file URI is likely a PDF.
 * @param {string} uri - The URI of the file.
 * @returns {boolean} True if the URI suggests a PDF file, false otherwise.
 */
const isPDFFile = (uri) => {
  if (!uri) return false;
  const lowerCaseUri = uri.toLowerCase();
  return lowerCaseUri.endsWith('.pdf');
};


/**
 * DocumentRequirementsPage component displays a list of document requirements,
 * allowing users to check them off, simulate file uploads, and view uploaded documents.
 *
 * @param {object} props - The component props.
 * @param {function} props.onGoBack - Callback function to navigate back to the previous screen.
 */
const DocumentRequirementsPage = ({ onGoBack }) => {
  // State to manage the list of documents and their status
  const [documents, setDocuments] = useState([
    { id: 'notarized', name: 'Notarized Unified Building Permit Application File', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'ancillary', name: 'Duly Accomplished Signed Ancillary Form', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'survey', name: 'Survey Plans', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'civil', name: 'Civil/Structural Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'electrical', name: 'Electrical Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'sanitary', name: 'Sanitary Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'plumbing', name: 'Plumbing Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'mechanical', name: 'Mechanical Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'geodetic', name: 'Geodetic Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'fire_protection', name: 'Fire Protection Documents', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'lot_plan', name: 'Lot Plan', isChecked: false, isUploaded: false, fileName: '', uri: '' },
    { id: 'estimated_value', name: 'Notarized Estimated Value', isChecked: false, isUploaded: false, fileName: '', uri: '' },
  ]);

  // State to control the visibility of the "View Document" modal
  const [showViewModal, setShowViewModal] = useState(false);
  // State to store the document currently being viewed in the modal
  const [currentViewedDoc, setCurrentViewedDoc] = useState(null);

  /**
   * Handles the change event for a document's checkbox.
   * Updates the `isChecked` status of the corresponding document in the state.
   *
   * @param {string} id - The unique ID of the document.
   * @param {boolean} newValue - The new checked status.
   */
  const handleCheckboxChange = (id, newValue) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === id ? { ...doc, isChecked: newValue } : doc))
    );
  };

  /**
   * Handles the file upload process using expo-document-picker.
   * Opens the device's file explorer, and if a file is selected, updates the
   * document's status (isUploaded, fileName, isChecked, uri).
   *
   * @param {string} id - The unique ID of the document to associate the upload with.
   */
  const handleUploadFile = async (id) => {
    try {
      // Open the document picker, allowing any type of file
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allows selection of any file type
        copyToCacheDirectory: false, // Prevents copying to cache if not needed
      });

      // Check if the user cancelled the picker
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uploadedFile = result.assets[0]; // Get the first selected file

        // Update the state for the specific document
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === id
              ? {
                  ...doc,
                  isChecked: true, // Mark checkbox as checked
                  isUploaded: true,
                  fileName: uploadedFile.name, // Set the actual file name
                  uri: uploadedFile.uri, // Store the URI of the uploaded file
                }
              : doc
          )
        );
        console.log('File uploaded:', uploadedFile.name, 'URI:', uploadedFile.uri);
        // In a real application, you would now handle the actual upload to a server
      } else {
        console.log('Document picking cancelled or no file selected.');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      // You could show an error message to the user here
    }
  };

  /**
   * Handles the action to view a document.
   * Sets the `currentViewedDoc` and makes the "View Document" modal visible.
   *
   * @param {object} doc - The document object to be viewed.
   */
  const handleViewDocument = (doc) => {
    setCurrentViewedDoc(doc);
    setShowViewModal(true);
  };

  /**
   * Attempts to open the PDF URI using Linking if it's a PDF.
   * Note: This will attempt to open it in an external app/browser if not handled by an internal viewer.
   */
  const handleOpenPdfExternal = async () => {
    if (currentViewedDoc && currentViewedDoc.uri && isPDFFile(currentViewedDoc.uri)) {
      try {
        await Linking.openURL(currentViewedDoc.uri);
      } catch (error) {
        console.error('Failed to open PDF:', error);
        // Fallback for when linking fails
        // In a real app, you'd handle this more gracefully (e.g., alert the user)
      }
    }
  };

  return (
    <ScrollView style={documentStyles.outerContainer}>
      <View style={documentStyles.container}>
        <Text style={documentStyles.header}>DOCUMENT REQUIREMENTS</Text>

        <View style={documentStyles.documentList}>
          {documents.map((doc) => (
            <View key={doc.id} style={documentStyles.documentItem}>
              <View style={documentStyles.documentInfo}>
                <Checkbox
                  value={doc.isChecked}
                  onValueChange={(newValue) => handleCheckboxChange(doc.id, newValue)}
                  color={doc.isChecked ? '#007bff' : undefined}
                  style={documentStyles.checkbox}
                />
                <Text style={documentStyles.documentName}>{doc.name}</Text>
              </View>
              <View style={documentStyles.buttonGroup}>
                <TouchableOpacity
                  style={documentStyles.uploadButton}
                  onPress={() => handleUploadFile(doc.id)} // Call the updated upload handler
                >
                  <Text style={documentStyles.buttonText}>Upload File</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    documentStyles.viewButton,
                    !doc.isUploaded && documentStyles.disabledButton,
                  ]}
                  onPress={() => handleViewDocument(doc)}
                  disabled={!doc.isUploaded}
                >
                  <Text style={documentStyles.buttonText}>View Document</Text>
                </TouchableOpacity>
              </View>
              {doc.isUploaded && (
                <Text style={documentStyles.uploadedFileName}>
                  File: {doc.fileName} (Uploaded)
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Button to go back to the previous screen (e.g., the main form) */}
        <TouchableOpacity style={documentStyles.goBackButton} onPress={onGoBack}>
          <Text style={documentStyles.goBackButtonText} href="/application">Go Back to Form</Text>
        </TouchableOpacity>

        {/* View Document Modal */}
        <Modal
          animationType="fade" // Fade animation for the modal
          transparent={true} // Makes the background transparent
          visible={showViewModal} // Controls modal visibility
          onRequestClose={() => setShowViewModal(false)} // Allows closing with back button on Android
        >
          <View style={documentStyles.centeredView}>
            <View style={documentStyles.modalView}>
              <Text style={documentStyles.modalTitle}>View Document</Text>
              {currentViewedDoc && ( // Only render content if a document is selected for viewing
                <>
                  <Text style={documentStyles.modalText}>
                    Viewing:
                  </Text>
                  <Text style={documentStyles.modalDocumentName}>
                    "{currentViewedDoc.name}"
                  </Text>

                  {/* Conditionally display content based on file type */}
                  {currentViewedDoc.uri && isImageFile(currentViewedDoc.uri) ? (
                    <Image
                      source={{ uri: currentViewedDoc.uri }}
                      style={documentStyles.modalImage}
                      resizeMode="contain" // Ensures the whole image is visible
                    />
                  ) : currentViewedDoc.uri && isPDFFile(currentViewedDoc.uri) ? (
                    <>
                      <Text style={documentStyles.modalFileName}>
                        File: {currentViewedDoc.fileName}
                      </Text>
                      <Text style={documentStyles.modalSubText}>
                        This is a PDF document. In a real application, a PDF viewer
                        would embed here or the document would open in a new window/app.
                      </Text>
                      <TouchableOpacity style={documentStyles.openPdfButton} onPress={handleOpenPdfExternal}>
                        <Text style={documentStyles.openPdfButtonText}>Open PDF (External)</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={documentStyles.modalFileName}>
                        File: {currentViewedDoc.fileName}
                      </Text>
                      <Text style={documentStyles.modalSubText}>
                        This file type cannot be previewed directly in this viewer.
                        In a real application, this might trigger a download or
                        open in an external application.
                      </Text>
                    </>
                  )}
                </>
              )}
              <TouchableOpacity
                style={documentStyles.modalButton}
                onPress={() => setShowViewModal(false)} // Close the modal
              >
                <Text style={documentStyles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

// Stylesheets for the DocumentRequirementsPage component
const documentStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5', // Light grey background for the scroll view
  },
  container: {
    padding: 20,
    width: '95%', // Occupy most of the width
    maxWidth: 700, // Max width for larger screens
    backgroundColor: '#fff', // White background for the main content area
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
    alignSelf: 'center', // Center the container horizontally
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
    textTransform: 'uppercase', // Uppercase text for header
  },
  documentList: {
    marginBottom: 20,
  },
  documentItem: {
    flexDirection: 'column', // Stack children vertically
    alignItems: 'flex-start', // Align items to the start for better readability on smaller screens
    backgroundColor: '#f9f9f9', // Slightly off-white for document items
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Space between info and buttons
    width: '100%', // Ensures it takes full width for flex alignment
  },
  checkbox: {
    marginRight: 10,
    borderRadius: 4,
  },
  documentName: {
    flex: 1, // Take up remaining space, allowing text to wrap
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row', // Buttons side-by-side
    justifyContent: 'space-between', // Space out buttons
    width: '100%', // Take full width
    marginTop: 5,
  },
  uploadButton: {
    backgroundColor: '#17a2b8', // Info blue
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    flex: 1, // Take equal space with view button
    marginRight: 5,
    alignItems: 'center', // Center text horizontally
  },
  viewButton: {
    backgroundColor: '#007bff', // Primary blue
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    flex: 1, // Take equal space with upload button
    marginLeft: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Grey for disabled buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  uploadedFileName: {
    fontSize: 12,
    color: '#28a745', // Green for success message
    marginTop: 10,
    alignSelf: 'flex-end', // Align to the end of the document item
    fontStyle: 'italic',
  },
  goBackButton: {
    backgroundColor: '#6c757d', // Grey color for go back
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center', // Center button horizontally
    shadowColor: '#6c757d',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Styles (for View Document Modal)
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
    maxWidth: 400, // Max width for the modal
    maxHeight: '90%', // Limit modal height
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  modalDocumentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalFileName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 15,
  },
  modalSubText: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalImage: {
    width: '100%', // Take full width of the modal
    height: 200, // Fixed height for image preview
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#e0e0e0', // Placeholder background for image loading
  },
  openPdfButton: {
    backgroundColor: '#dc3545', // Red color for PDF button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 2,
  },
  openPdfButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default DocumentRequirementsPage; // Export the component
