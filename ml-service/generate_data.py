import pandas as pd
import numpy as np

# Daftar talent
talents = [
    'Futsal', 'Basket', 'Dance', 'Cooking', 'Tapak Suci',
    'Math', 'English', 'Art & Science', 'Band', 'Assemble',
    'DKV', 'Coding', 'Drone'
]

# Profil ideal setiap talent terhadap 12 fitur (nilai 1-5)
# Urutan fitur: Fisik, Tim, SeniVisual, Musik, Memasak, BelaDiri,
#               Logika, Bahasa, Sains, Desain, Teknologi, Mekanik
profiles = {
    'Futsal':       [5,5,2,2,2,3, 2,2,2,2,2,2],
    'Basket':       [5,5,2,2,2,2, 2,2,2,2,2,2],
    'Dance':        [4,3,5,4,2,2, 2,2,2,4,2,2],
    'Cooking':      [3,3,3,2,5,2, 2,2,2,3,2,2],
    'Tapak Suci':   [5,3,3,2,2,5, 2,2,2,2,2,2],
    'Math':         [2,2,2,2,2,2, 5,2,3,2,3,2],
    'English':      [2,3,2,2,2,2, 2,5,2,2,2,2],
    'Art & Science':[2,3,4,2,2,2, 3,2,5,5,3,2],
    'Band':         [2,4,3,5,2,2, 2,2,2,2,2,2],
    'Assemble':     [3,4,2,2,2,2, 3,2,3,2,4,5],
    'DKV':          [2,3,5,2,2,2, 2,2,2,5,3,2],
    'Coding':       [2,3,2,2,2,2, 4,2,3,2,5,3],
    'Drone':        [3,3,2,2,2,2, 4,2,4,2,4,4]
}

# Konversi ke DataFrame
profile_df = pd.DataFrame(profiles).T
profile_df.columns = ['Fisik','Tim','SeniVisual','Musik','Memasak','BelaDiri',
                      'Logika','Bahasa','Sains','Desain','Teknologi','Mekanik']

# Generate data sintetis: 30 sampel per talent (total 390)
n_per_talent = 30
data = []
for talent in talents:
    for _ in range(n_per_talent):
        # Ambil profil ideal
        ideal = profiles[talent]
        # Tambah noise normal (std=0.8) lalu clip ke 1-5
        noisy = [np.clip(round(ideal[i] + np.random.normal(0, 0.8)), 1, 5) for i in range(12)]
        row = noisy + [talent]
        data.append(row)

columns = ['Fisik','Tim','SeniVisual','Musik','Memasak','BelaDiri',
           'Logika','Bahasa','Sains','Desain','Teknologi','Mekanik','talent']
df = pd.DataFrame(data, columns=columns)
df = df.sample(frac=1).reset_index(drop=True)
df.to_csv('dataset.csv', index=False)
print(f"Dataset generated with {len(df)} rows")
print(df.head())