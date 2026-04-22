import { SetMetadata } from '@nestjs/common';

export const VIEW_METADATA = 'view_metadata';
export const View = (template: string) => SetMetadata(VIEW_METADATA, template);
