
import mongoose, { Schema } from 'mongoose';
import { IProject } from './project.interface';



const projectSchema = new Schema<IProject>({

  projectName: {
    type: String,
    required: true,
    maxlength: [100, 'Project Name must be less than 100 characters'],
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, 'Description must be less than 500 characters'],
  },
  features: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length > 0, 'At least one feature is required'],
  },
  githubClientCode: {
    type: String,
    required: true,

  },
  githubServerCode: {
    type: String,
    required: true,

  },
  liveLink: {
    type: String,
    required: true,

  },
  imageUrl: {
    type: String,
    required: true,

  },
}, { timestamps: true });

const ProjectModel = mongoose.model<IProject>('Project', projectSchema);

export default ProjectModel;
