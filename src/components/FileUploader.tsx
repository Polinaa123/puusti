import React, {useState} from 'react';

interface FileUploaderProps{
    onChange: (files: File[]) => void;
    maxFiles?: number;
    maxSizeMb?: number;
    accept?: string;
}

export function FileUploader({
    onChange,
    maxFiles=5,
    maxSizeMb= 10,
    accept = '.jpg,.png,.pdf',
    
}: FileUploaderProps) {
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files ? Array.from(e.target.files) : [];
        if (selected.length + files.length > maxFiles) {
            setError(`Нельзя загрузить более ${maxFiles} файлов`);
            return;
        }
        let totalSize = files.reduce((sum, f) => sum + f.size, 0);
        for (let file of selected) {
            const ext = `.${file.name.split('.').pop()}`;
            if (!accept.split(',').includes(ext)) {
                setError('Допустимые форматы: JPEG, PNG, PDF');
                return;
            }
            if (file.size > maxSizeMb * 1024 * 1024) {
                setError(`Файл "${file.name}" слишком большой`);
                return;
            }
            totalSize += file.size;
            if (totalSize > maxSizeMb * 1024 * 1024) {
                setError(`Общий размер файлов не должен превышать ${maxSizeMb} MB`);
                return;
            }
        }
        const newList = [...files, ...selected];
        setFiles(newList);
        setError(null);
        onChange(newList);
    };

    return(
        <div>
            <input type="file" multiple accept={accept} onChange={handleFiles} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <p className="text-gray-600 text-sm mt-1">Загружено: {files.length}/{maxFiles}</p>
        </div>
    );
}