import { useDateFilter } from '../../context/DateFilterContext';
import { Calendar } from 'lucide-react';
import '../../styles/PageHeader.css';

interface PageHeaderProps {
    title: string;
    description?: string;
    showDateFilter?: boolean;
    icon?: React.ElementType;
}

export function PageHeader({ title, description, showDateFilter = false, icon: Icon }: PageHeaderProps) {
    const { startDate, endDate, setStartDate, setEndDate, setPreset } = useDateFilter();

    return (
        <header className="page-header">
            <div className="page-title-section">
                <div className="flex items-center gap-3">
                    {Icon && <div className="page-header-icon"><Icon size={28} /></div>}
                    <h1 className="page-title">{title}</h1>
                </div>
                {description && <p className="page-description">{description}</p>}
            </div>

            {showDateFilter && (
                <div className="date-filter-section glass-panel">
                    <Calendar size={18} className="text-secondary" />
                    <div className="date-presets">
                        <button type="button" onClick={() => setPreset(7)} className="preset-btn">7D</button>
                        <button type="button" onClick={() => setPreset(30)} className="preset-btn">30D</button>
                        <button type="button" onClick={() => setPreset(90)} className="preset-btn">90D</button>
                    </div>
                    <div className="date-inputs">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="date-input"
                            max={endDate}
                        />
                        <span>to</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="date-input"
                            min={startDate}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
