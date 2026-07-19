import { Button } from '@/src/components/ui/button'
import { Copy } from 'lucide-react'

const componentCategories = [
  {
    category: 'Forms & Input',
    components: ['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Textarea'],
  },
  {
    category: 'Navigation',
    components: ['Sidebar', 'Header', 'Breadcrumb', 'Tabs'],
  },
  {
    category: 'Feedback',
    components: ['Status Badge', 'Progress Bar', 'Alert', 'Toast'],
  },
  {
    category: 'Data Display',
    components: ['Table', 'Card', 'Grid', 'List'],
  },
  {
    category: 'Modals & Overlays',
    components: ['Modal', 'Drawer', 'Dropdown', 'Tooltip'],
  },
]

export default function ComponentsLibraryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Component Library</h1>
        <p className="text-muted-foreground">Reusable UI components used throughout the dashboard</p>
      </div>

      <div className="grid gap-6">
        {componentCategories.map((categoryData, idx) => (
          <div key={idx} className="rounded-lg border border-border p-6 bg-card">
            <h2 className="text-lg font-bold text-foreground mb-4">{categoryData.category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {categoryData.components.map((component, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border border-border/50 bg-muted hover:bg-muted/80 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span className="text-sm font-medium text-foreground">{component}</span>
                  <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border p-6 bg-card">
        <h2 className="text-lg font-bold text-foreground mb-4">Design Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Colors</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary"></div>
                <span className="text-sm text-foreground">Primary - #E9CC2F</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-foreground"></div>
                <span className="text-sm text-foreground">Foreground</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-background border border-border"></div>
                <span className="text-sm text-foreground">Background</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-muted"></div>
                <span className="text-sm text-foreground">Muted</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Spacing</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">xs: 0.25rem (4px)</p>
              <p className="text-muted-foreground">sm: 0.5rem (8px)</p>
              <p className="text-muted-foreground">md: 1rem (16px)</p>
              <p className="text-muted-foreground">lg: 1.5rem (24px)</p>
              <p className="text-muted-foreground">xl: 2rem (32px)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
