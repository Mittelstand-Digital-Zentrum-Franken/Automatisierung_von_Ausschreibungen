import pandas as pd
import ezdxf

def read_floorplan(path: str) -> ezdxf.document.Drawing:
    """Load the uploaded floorplan.

    Args:
        path: filepath of floorplan

    Returns:
        doc: ezdxf.document.Drawing fith loaded floorplan 
    """
    try:
        doc = ezdxf.readfile(path)
        print(f"Datei {path} erfolgreich geladen.")
    except IOError:
        print(f"Konnte die Datei {path} nicht öffnen.")
    except ezdxf.DXFStructureError:
        print(f"Die Datei {path} ist keine gültige DXF-Datei.")

    return doc


def get_blocks(loaded_floorplan: ezdxf.document.Drawing) -> pd.DataFrame:
    """Extract the grouped block names and thier amount.

    Args:
        loaded_floorplan: loaded floorplan from dxf file

    Returns:
        df_block_counts: Dataframe with blocknames and count
    """

    # Extract Layouts
    msp = loaded_floorplan.modelspace()

    # Empty list
    data = []

    # Extract the layers and block names
    for entity in msp:
        layer = entity.dxf.layer
        if entity.dxftype() == 'INSERT':
            block_name = entity.dxf.name

            # Add to list
            data.append({'Blockname': block_name, 'Layer': layer})

    # Convert to dataframe
    df_blocks = pd.DataFrame(data)

    # Group block names and count blocks in Layer
    df_block_counts = df_blocks.groupby('Blockname').size().reset_index(name='Block Count').sort_values(by='Block Count', ascending=False)

    return df_block_counts