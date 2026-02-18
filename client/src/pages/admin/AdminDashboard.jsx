import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    FaTrash, FaPlus, FaEdit, FaTimes, FaCheck,
    FaProjectDiagram, FaComments, FaLightbulb, FaUsers, FaCog
} from 'react-icons/fa';
import './AdminDashboard.css';
import AdminNavigation from './components/AdminNavigation';
import FormCard from './components/FormCard';
import DragDropUpload from './components/DragDropUpload';
import Toast from './components/Toast';
import CategoryManager from './components/CategoryManager';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Projects State
    const [projects, setProjects] = useState([]);
    const [projectCategories, setProjectCategories] = useState(['residential', 'commercial', 'art-craft']);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        category: '',
        image: ''
    });
    const [editingProjectId, setEditingProjectId] = useState(null);

    // Testimonials State
    const [testimonials, setTestimonials] = useState([]);

    // Expertise State
    const [expertise, setExpertise] = useState([]);
    const [expertiseForm, setExpertiseForm] = useState({
        title: '',
        description: '',
        icon: '',
        order: 0
    });
    const [editingExpertiseId, setEditingExpertiseId] = useState(null);

    // Team Members State
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamForm, setTeamForm] = useState({
        name: '',
        role: '',
        image: '',
        mobilePhone: '',
        linkedin: '',
        instagram: '',
        twitter: '#',
        order: 0
    });
    const [editingTeamId, setEditingTeamId] = useState(null);

    // Services State
    const [services, setServices] = useState([]);
    const [serviceForm, setServiceForm] = useState({
        title: '',
        description: '',
        icon: '',
        order: 0
    });
    const [editingServiceId, setEditingServiceId] = useState(null);

    // Delete Confirmation Modal State
    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        itemType: '', // 'testimonial', 'project', etc
        itemId: '',
        itemName: '',
        isLoading: false
    });

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    // ============ FETCH ALL DATA ============
    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/projects');
            const data = await response.json();
            if (data.success) setProjects(data.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/testimonials/admin/all', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) setTestimonials(data.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const fetchExpertise = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/expertise');
            const data = await response.json();
            if (data.success) setExpertise(data.data);
        } catch (error) {
            console.error('Error fetching expertise:', error);
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/team-members');
            const data = await response.json();
            if (data.success) setTeamMembers(data.data);
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/services');
            const data = await response.json();
            if (data.success) setServices(data.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/categories/admin/all', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                // Extract category names for the display
                const categoryNames = data.data.map(cat => cat.name);
                setProjectCategories(categoryNames);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchAllData = useCallback(async () => {
        setLoading(true);
        await Promise.all([
            fetchProjects(),
            fetchTestimonials(),
            fetchExpertise(),
            fetchTeamMembers(),
            fetchServices(),
            fetchCategories()
        ]);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // ============ PROJECTS FUNCTIONS ============

    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = editingProjectId
                ? `http://localhost:5000/api/projects/${editingProjectId}`
                : 'http://localhost:5000/api/projects';
            const method = editingProjectId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(projectForm)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to save project');

            showToast(editingProjectId ? 'Project updated successfully!' : 'Project published successfully!', 'success');
            setProjectForm({ title: '', description: '', category: '', image: '' });
            setEditingProjectId(null);
            fetchProjects();
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleAddCategory = async (newCategory) => {
        if (!projectCategories.includes(newCategory)) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: newCategory.toLowerCase(),
                        displayName: newCategory.charAt(0).toUpperCase() + newCategory.slice(1).replace(/-/g, ' ')
                    })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Failed to add category');

                setProjectCategories([...projectCategories, newCategory.toLowerCase()]);
                showToast('Category added successfully!', 'success');
            } catch (error) {
                showToast(error.message, 'error');
            }
        } else {
            showToast('This category already exists', 'error');
        }
    };

    const handleRemoveCategory = async (category) => {
        try {
            const token = localStorage.getItem('token');
            // Find the category ID first
            const allCategoriesResponse = await fetch('http://localhost:5000/api/categories/admin/all', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const allCategoriesData = await allCategoriesResponse.json();
            const categoryToDelete = allCategoriesData.data.find(cat => cat.name === category);

            if (categoryToDelete) {
                const response = await fetch(`http://localhost:5000/api/categories/${categoryToDelete._id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error('Failed to delete category');

                setProjectCategories(projectCategories.filter(c => c !== category));
                if (projectForm.category === category) {
                    setProjectForm({ ...projectForm, category: '' });
                }
                showToast('Category removed successfully!', 'success');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleProjectEdit = (project) => {
        setProjectForm({
            title: project.title,
            description: project.description,
            category: project.category,
            image: project.image
        });
        setEditingProjectId(project._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleProjectDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete');
            showToast('Project deleted successfully!', 'success');
            fetchProjects();
        } catch (error) {
            showToast('Failed to delete project', 'error');
        }
    };

    // ============ TESTIMONIALS FUNCTIONS ============

    const handleTestimonialApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/testimonials/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            showToast('Testimonial published successfully!', 'success');
            fetchTestimonials();
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleTestimonialDeny = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/testimonials/${id}/deny`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            showToast('Testimonial unpublished successfully!', 'success');
            fetchTestimonials();
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleTestimonialDelete = (id, name) => {
        setDeleteModal({
            isOpen: true,
            itemType: 'testimonial',
            itemId: id,
            itemName: name,
            isLoading: false
        });
    };

    const confirmTestimonialDelete = async () => {
        setDeleteModal(prev => ({ ...prev, isLoading: true }));

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/testimonials/${deleteModal.itemId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete');
            showToast('Testimonial deleted successfully!', 'success');
            setDeleteModal({ isOpen: false, itemType: '', itemId: '', itemName: '', isLoading: false });
            fetchTestimonials();
        } catch (error) {
            showToast('Failed to delete testimonial', 'error');
            setDeleteModal(prev => ({ ...prev, isLoading: false }));
        }
    };

    // ============ EXPERTISE FUNCTIONS ============

    const handleExpertiseSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = editingExpertiseId
                ? `http://localhost:5000/api/expertise/${editingExpertiseId}`
                : 'http://localhost:5000/api/expertise';
            const method = editingExpertiseId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(expertiseForm)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to save expertise');

            showToast(editingExpertiseId ? 'Expertise updated!' : 'Expertise added!', 'success');
            setExpertiseForm({ title: '', description: '', icon: '', order: 0 });
            setEditingExpertiseId(null);
            fetchExpertise();
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleExpertiseEdit = (item) => {
        setExpertiseForm({
            title: item.title,
            description: item.description,
            icon: item.icon,
            order: item.order
        });
        setEditingExpertiseId(item._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleExpertiseDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this expertise item?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/expertise/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete');
            showToast('Expertise deleted successfully!', 'success');
            fetchExpertise();
        } catch (error) {
            showToast('Failed to delete expertise', 'error');
        }
    };

    // ============ TEAM MEMBERS FUNCTIONS ============

    const handleTeamSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = editingTeamId
                ? `http://localhost:5000/api/team-members/${editingTeamId}`
                : 'http://localhost:5000/api/team-members';
            const method = editingTeamId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(teamForm)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to save team member');

            showToast(editingTeamId ? 'Team member updated!' : 'Team member added!', 'success');
            setTeamForm({ name: '', role: '', image: '', mobilePhone: '', linkedin: '', instagram: '', twitter: '#', order: 0 });
            setEditingTeamId(null);
            fetchTeamMembers();
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleTeamEdit = (member) => {
        setTeamForm({
            name: member.name,
            role: member.role,
            image: member.image,
            mobilePhone: member.mobilePhone,
            linkedin: member.linkedin,
            instagram: member.instagram,
            twitter: member.twitter,
            order: member.order
        });
        setEditingTeamId(member._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTeamDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this team member?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/team-members/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete');
            showToast('Team member deleted successfully!', 'success');
            fetchTeamMembers();
        } catch (error) {
            showToast('Failed to delete team member', 'error');
        }
    };

    // ============ SERVICES FUNCTIONS ============

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = editingServiceId
                ? `http://localhost:5000/api/services/${editingServiceId}`
                : 'http://localhost:5000/api/services';
            const method = editingServiceId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(serviceForm)
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to save service');

            showToast(editingServiceId ? 'Service updated!' : 'Service added!', 'success');
            setServiceForm({ title: '', description: '', icon: '', order: 0 });
            setEditingServiceId(null);
            fetchServices();
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleServiceEdit = (service) => {
        setServiceForm({
            title: service.title,
            description: service.description,
            icon: service.icon,
            order: service.order
        });
        setEditingServiceId(service._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleServiceDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to delete');
            showToast('Service deleted successfully!', 'success');
            fetchServices();
        } catch (error) {
            showToast('Failed to delete service', 'error');
        }
    };

    const cancelEdit = () => {
        setProjectForm({ title: '', description: '', category: '', image: '' });
        setExpertiseForm({ title: '', description: '', icon: '', order: 0 });
        setTeamForm({ name: '', role: '', image: '', mobilePhone: '', linkedin: '', instagram: '', twitter: '#', order: 0 });
        setServiceForm({ title: '', description: '', icon: '', order: 0 });
        setEditingProjectId(null);
        setEditingExpertiseId(null);
        setEditingTeamId(null);
        setEditingServiceId(null);
    };

    return (
        <div className="admin-dashboard">
            <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="admin-dashboard-content">
                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <div className="admin-section-wrapper">
                        <div className="form-section">
                            <FormCard
                                title={editingProjectId ? 'Update Project' : 'Publish New Project'}
                                icon={editingProjectId ? <FaEdit /> : <FaPlus />}
                            >
                                <form onSubmit={handleProjectSubmit} className="admin-form">
                                    <div className="form-subsection">
                                        <h4 className="subsection-title">Project Information</h4>
                                        <div className="form-group">
                                            <label htmlFor="project-title">Project Title <span className="required">*</span></label>
                                            <input
                                                id="project-title"
                                                type="text"
                                                value={projectForm.title}
                                                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                                                required
                                                placeholder="e.g. Luxury Apartment in Chennai"
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="project-description">Description / Location <span className="required">*</span></label>
                                            <textarea
                                                id="project-description"
                                                value={projectForm.description}
                                                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                                                required
                                                rows="4"
                                                placeholder="Describe the project, location, key features..."
                                                className="form-textarea"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="form-subsection">
                                        <h4 className="subsection-title">Category</h4>
                                        <CategoryManager
                                            categories={projectCategories}
                                            selectedCategory={projectForm.category}
                                            onSelectCategory={(cat) => setProjectForm({ ...projectForm, category: cat })}
                                            onAddCategory={handleAddCategory}
                                            onRemoveCategory={handleRemoveCategory}
                                        />
                                    </div>

                                    <div className="form-subsection">
                                        <h4 className="subsection-title">Project Image <span className="required">*</span></h4>
                                        <DragDropUpload
                                            imageUrl={projectForm.image}
                                            onImageUrlChange={(url) => setProjectForm({ ...projectForm, image: url })}
                                            label="Project Image"
                                        />
                                    </div>

                                    <div className="form-actions-footer">
                                        <button type="submit" disabled={submitLoading} className="btn-publish">
                                            {submitLoading ? <>Saving...</> : (editingProjectId ? <>Update Project</> : <>Publish Project</>)}
                                        </button>
                                        {editingProjectId && (
                                            <>
                                                <button type="button" onClick={cancelEdit} className="btn-secondary"><FaTimes /> Cancel</button>
                                                <button type="button" onClick={() => { handleProjectDelete(editingProjectId); cancelEdit(); }} className="btn-danger"><FaTrash /> Delete</button>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </FormCard>
                        </div>

                        <div className="content-section">
                            <div className="section-header">
                                <h3 className="section-title">Published Projects</h3>
                                <span className="item-count">{projects.length}</span>
                            </div>
                            {loading ? (
                                <div className="loading-state"><div className="spinner"></div><p>Loading...</p></div>
                            ) : projects.length === 0 ? (
                                <div className="empty-state"><FaProjectDiagram className="empty-icon" /><p>No projects published yet</p></div>
                            ) : (
                                <div className="content-grid">
                                    {projects.map((project) => (
                                        <div key={project._id} className="content-card">
                                            <div className="content-card-image">
                                                <img src={project.image} alt={project.title} />
                                                {project.category && <span className="content-card-badge">{project.category}</span>}
                                            </div>
                                            <div className="content-card-body">
                                                <h4>{project.title}</h4>
                                                <p>{project.description}</p>
                                            </div>
                                            <div className="content-card-actions">
                                                <button onClick={() => handleProjectEdit(project)} className="btn-action-edit"><FaEdit /></button>
                                                <button onClick={() => handleProjectDelete(project._id)} className="btn-action-delete"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TESTIMONIALS TAB */}
                {activeTab === 'testimonials' && (
                    <div className="content-section">
                        <div className="section-header">
                            <h3 className="section-title">Manage Testimonials</h3>
                            <span className="item-count">{testimonials.length}</span>
                        </div>
                        {loading ? (
                            <div className="loading-state"><div className="spinner"></div></div>
                        ) : testimonials.length === 0 ? (
                            <div className="empty-state"><FaComments className="empty-icon" /><p>No testimonials yet</p></div>
                        ) : (
                            <div className="testimonials-content-grid">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial._id} className={`testimonial-content-card ${testimonial.approved ? 'approved' : 'pending'}`}>
                                        <div className="testimonial-card-header">
                                            <div className="testimonial-card-info">
                                                <h4>{testimonial.name}</h4>
                                                <p className="testimonial-subtitle">{testimonial.postalAddress}</p>
                                                <p className="testimonial-subtitle">{testimonial.mobileNumber}</p>
                                            </div>
                                            <span className={`testimonial-card-status ${testimonial.approved ? 'approved' : 'pending'}`}>{testimonial.approved ? 'Published' : 'Pending'}</span>
                                        </div>
                                        <div className="testimonial-card-rating">{'⭐'.repeat(testimonial.rating)}</div>
                                        <p className="testimonial-card-text">"{testimonial.testimonialText}"</p>
                                        <div className="testimonial-card-actions">
                                            {!testimonial.approved ? (
                                                <button onClick={() => handleTestimonialApprove(testimonial._id)} className="btn-action-approve"><FaCheck /> Approve</button>
                                            ) : (
                                                <button onClick={() => handleTestimonialDeny(testimonial._id)} className="btn-action-deny"><FaTimes /> Unpublish</button>
                                            )}
                                            <button onClick={() => handleTestimonialDelete(testimonial._id, testimonial.name)} className="btn-action-delete"><FaTrash /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* EXPERTISE TAB */}
                {activeTab === 'expertise' && (
                    <div className="admin-section-wrapper">
                        <div className="form-section">
                            <FormCard title={editingExpertiseId ? 'Update Expertise' : 'Add New Expertise'} icon={editingExpertiseId ? <FaEdit /> : <FaPlus />}>
                                <form onSubmit={handleExpertiseSubmit} className="admin-form">
                                    <div className="form-group">
                                        <label htmlFor="expertise-title">Title <span className="required">*</span></label>
                                        <input id="expertise-title" type="text" value={expertiseForm.title} onChange={(e) => setExpertiseForm({ ...expertiseForm, title: e.target.value })} required placeholder="e.g. Kitchen Design" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expertise-description">Description <span className="required">*</span></label>
                                        <textarea id="expertise-description" value={expertiseForm.description} onChange={(e) => setExpertiseForm({ ...expertiseForm, description: e.target.value })} required rows="4" placeholder="Describe this expertise..." className="form-textarea"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expertise-icon">Icon / Emoji <span className="required">*</span></label>
                                        <input id="expertise-icon" type="text" value={expertiseForm.icon} onChange={(e) => setExpertiseForm({ ...expertiseForm, icon: e.target.value })} required placeholder="e.g. 🍳 or FaUtensils" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expertise-order">Display Order</label>
                                        <input id="expertise-order" type="number" value={expertiseForm.order} onChange={(e) => setExpertiseForm({ ...expertiseForm, order: parseInt(e.target.value) })} placeholder="0" className="form-input" />
                                    </div>
                                    <div className="form-actions-footer">
                                        <button type="submit" disabled={submitLoading} className="btn-publish">{submitLoading ? 'Saving...' : (editingExpertiseId ? 'Update' : 'Add')}</button>
                                        {editingExpertiseId && <button type="button" onClick={cancelEdit} className="btn-secondary"><FaTimes /> Cancel</button>}
                                    </div>
                                </form>
                            </FormCard>
                        </div>
                        <div className="content-section">
                            <div className="section-header">
                                <h3 className="section-title">Expertise Items</h3>
                                <span className="item-count">{expertise.length}</span>
                            </div>
                            {loading ? (
                                <div className="loading-state"><div className="spinner"></div></div>
                            ) : expertise.length === 0 ? (
                                <div className="empty-state"><FaLightbulb className="empty-icon" /><p>No expertise items yet</p></div>
                            ) : (
                                <div className="content-grid">
                                    {expertise.map((item) => (
                                        <div key={item._id} className="content-card">
                                            <div className="content-card-icon">{item.icon}</div>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                            <small className="order-label">Order: {item.order}</small>
                                            <div className="content-card-actions">
                                                <button onClick={() => handleExpertiseEdit(item)} className="btn-action-edit"><FaEdit /></button>
                                                <button onClick={() => handleExpertiseDelete(item._id)} className="btn-action-delete"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TEAM MEMBERS TAB */}
                {activeTab === 'team' && (
                    <div className="admin-section-wrapper">
                        <div className="form-section">
                            <FormCard title={editingTeamId ? 'Update Team Member' : 'Add Team Member'} icon={editingTeamId ? <FaEdit /> : <FaPlus />}>
                                <form onSubmit={handleTeamSubmit} className="admin-form">
                                    <div className="form-group">
                                        <label htmlFor="team-name">Name <span className="required">*</span></label>
                                        <input id="team-name" type="text" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required placeholder="Full name" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-role">Role / Position <span className="required">*</span></label>
                                        <input id="team-role" type="text" value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} required placeholder="e.g. Senior Architect" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-image">Profile Image <span className="required">*</span></label>
                                        <DragDropUpload imageUrl={teamForm.image} onImageUrlChange={(url) => setTeamForm({ ...teamForm, image: url })} label="Profile Image" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-linkedin">LinkedIn URL <span className="required">*</span></label>
                                        <input id="team-linkedin" type="url" value={teamForm.linkedin} onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })} required placeholder="https://linkedin.com/in/..." className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-instagram">Instagram URL <span className="required">*</span></label>
                                        <input id="team-instagram" type="url" value={teamForm.instagram} onChange={(e) => setTeamForm({ ...teamForm, instagram: e.target.value })} required placeholder="https://instagram.com/..." className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-mobile">Mobile Phone <span className="required">*</span></label>
                                        <input id="team-mobile" type="tel" value={teamForm.mobilePhone} onChange={(e) => setTeamForm({ ...teamForm, mobilePhone: e.target.value })} required placeholder="10-digit phone number" pattern="\d{10}" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-twitter">Twitter URL</label>
                                        <input id="team-twitter" type="url" value={teamForm.twitter} onChange={(e) => setTeamForm({ ...teamForm, twitter: e.target.value })} placeholder="https://twitter.com/..." className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="team-order">Display Order</label>
                                        <input id="team-order" type="number" value={teamForm.order} onChange={(e) => setTeamForm({ ...teamForm, order: parseInt(e.target.value) })} placeholder="0" className="form-input" />
                                    </div>
                                    <div className="form-actions-footer">
                                        <button type="submit" disabled={submitLoading} className="btn-publish">{submitLoading ? 'Saving...' : (editingTeamId ? 'Update' : 'Add')}</button>
                                        {editingTeamId && <button type="button" onClick={cancelEdit} className="btn-secondary"><FaTimes /> Cancel</button>}
                                    </div>
                                </form>
                            </FormCard>
                        </div>
                        <div className="content-section">
                            <div className="section-header">
                                <h3 className="section-title">Team Members</h3>
                                <span className="item-count">{teamMembers.length}</span>
                            </div>
                            {loading ? (
                                <div className="loading-state"><div className="spinner"></div></div>
                            ) : teamMembers.length === 0 ? (
                                <div className="empty-state"><FaUsers className="empty-icon" /><p>No team members yet</p></div>
                            ) : (
                                <div className="content-grid">
                                    {teamMembers.map((member) => (
                                        <div key={member._id} className="content-card team-card">
                                            <div className="content-card-image"><img src={member.image} alt={member.name} /></div>
                                            <h4>{member.name}</h4>
                                            <p className="team-role">{member.role}</p>
                                            <div className="social-badges">
                                                {member.linkedin !== '#' && <span className="social-badge">LinkedIn ✓</span>}
                                                {member.twitter !== '#' && <span className="social-badge">Twitter ✓</span>}
                                                {member.instagram !== '#' && <span className="social-badge">Instagram ✓</span>}
                                            </div>
                                            <small className="order-label">Order: {member.order}</small>
                                            <div className="content-card-actions">
                                                <button onClick={() => handleTeamEdit(member)} className="btn-action-edit"><FaEdit /></button>
                                                <button onClick={() => handleTeamDelete(member._id)} className="btn-action-delete"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* SERVICES TAB */}
                {activeTab === 'services' && (
                    <div className="admin-section-wrapper">
                        <div className="form-section">
                            <FormCard title={editingServiceId ? 'Update Service' : 'Add New Service'} icon={editingServiceId ? <FaEdit /> : <FaPlus />}>
                                <form onSubmit={handleServiceSubmit} className="admin-form">
                                    <div className="form-group">
                                        <label htmlFor="service-title">Title <span className="required">*</span></label>
                                        <input id="service-title" type="text" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} required placeholder="e.g. Interior Consultation" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service-description">Description <span className="required">*</span></label>
                                        <textarea id="service-description" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} required rows="4" placeholder="Describe this service..." className="form-textarea"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service-icon">Icon / Emoji <span className="required">*</span></label>
                                        <input id="service-icon" type="text" value={serviceForm.icon} onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })} required placeholder="e.g. 🎨" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service-order">Display Order</label>
                                        <input id="service-order" type="number" value={serviceForm.order} onChange={(e) => setServiceForm({ ...serviceForm, order: parseInt(e.target.value) })} placeholder="0" className="form-input" />
                                    </div>
                                    <div className="form-actions-footer">
                                        <button type="submit" disabled={submitLoading} className="btn-publish">{submitLoading ? 'Saving...' : (editingServiceId ? 'Update' : 'Add')}</button>
                                        {editingServiceId && <button type="button" onClick={cancelEdit} className="btn-secondary"><FaTimes /> Cancel</button>}
                                    </div>
                                </form>
                            </FormCard>
                        </div>
                        <div className="content-section">
                            <div className="section-header">
                                <h3 className="section-title">Services</h3>
                                <span className="item-count">{services.length}</span>
                            </div>
                            {loading ? (
                                <div className="loading-state"><div className="spinner"></div></div>
                            ) : services.length === 0 ? (
                                <div className="empty-state"><FaCog className="empty-icon" /><p>No services yet</p></div>
                            ) : (
                                <div className="content-grid">
                                    {services.map((service) => (
                                        <div key={service._id} className="content-card">
                                            <div className="content-card-icon">{service.icon}</div>
                                            <h4>{service.title}</h4>
                                            <p>{service.description}</p>
                                            <small className="order-label">Order: {service.order}</small>
                                            <div className="content-card-actions">
                                                <button onClick={() => handleServiceEdit(service)} className="btn-action-edit"><FaEdit /></button>
                                                <button onClick={() => handleServiceDelete(service._id)} className="btn-action-delete"><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Toast Notification */}
            {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} duration={4000} />}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                title="Delete Testimonial?"
                message="Are you sure you want to permanently delete this testimonial? This action cannot be undone."
                itemName={deleteModal.itemName}
                isLoading={deleteModal.isLoading}
                onConfirm={confirmTestimonialDelete}
                onCancel={() => setDeleteModal({ isOpen: false, itemType: '', itemId: '', itemName: '', isLoading: false })}
            />
        </div>
    );
};

export default AdminDashboard;
