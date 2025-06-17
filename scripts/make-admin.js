const { PrismaClient } = require('@prisma/client')

async function makeAdmin() {
  const prisma = new PrismaClient()
  
  try {
    console.log('👥 Mevcut kullanıcılar:')
    
    // Tüm kullanıcıları listele
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })
    
    console.log('\n📋 Kullanıcı listesi:')
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Rol: ${user.role}`)
    })
    
    // USER rolündeki kullanıcıları ADMIN yap
    const normalUsers = users.filter(u => u.role === 'USER')
    
    if (normalUsers.length > 0) {
      console.log('\n🔧 Normal kullanıcıları admin yapıyorum...')
      
      for (const user of normalUsers) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: 'ADMIN' }
        })
        console.log(`✅ ${user.email} artık admin!`)
      }
      
      console.log(`\n🎯 Toplam ${normalUsers.length} kullanıcı admin yapıldı!`)
    } else {
      console.log('\n✅ Tüm kullanıcılar zaten admin!')
    }
    
    console.log('\n🎉 İşlem tamamlandı!')
    
  } catch (error) {
    console.error('❌ Hata:', error)
  } finally {
    await prisma.$disconnect()
  }
}

makeAdmin() 